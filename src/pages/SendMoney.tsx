import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { dummyUser } from '../data/dummy'

const SendMoney = () => {
  const navigate = useNavigate()
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD')
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const exchangeRate = 1600
  const rawBalance = Number(localStorage.getItem('balance')) || dummyUser.balance
  const balance = currency === 'USD'
    ? rawBalance
    : rawBalance * exchangeRate

  const handleSend = () => {
    if (!recipient || !amount) {
      setError('Please fill in all fields')
      return
    }
    if (Number(amount) <= 0) {
      setError('Enter a valid amount')
      return
    }
    if (Number(amount) > balance) {
      setError('Insufficient balance')
      return
    }
    setError('')

    // Update balance
    const currentBalance = Number(localStorage.getItem('balance')) || dummyUser.balance
    const deductedAmount = currency === 'NGN' ? Number(amount) / exchangeRate : Number(amount)
    localStorage.setItem('balance', String(currentBalance - deductedAmount))
    window.dispatchEvent(new Event('focus'))

    // Save transaction
    const newTransaction = {
      id: Date.now().toString(),
      type: 'debit',
      amount: deductedAmount,
      description: `Transfer to ${recipient}`,
      date: new Date().toISOString().split('T')[0],
      recipient
    }

    const existing = JSON.parse(localStorage.getItem('transactions') || '[]')
    localStorage.setItem('transactions', JSON.stringify([newTransaction, ...existing]))

    setSuccess(true)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl p-10 w-full max-w-md shadow-2xl text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
            ✓
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Transfer Successful!</h2>
          <p className="text-gray-500 mb-2">You sent</p>
          <p className="text-4xl font-bold text-blue-700 mb-2">
            {currency === 'USD' ? '$' : '₦'}{Number(amount).toLocaleString()}
          </p>
          <p className="text-gray-500 mb-8">to <span className="font-semibold text-gray-900">{recipient}</span></p>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-blue-700 text-white font-semibold py-4 rounded-full hover:bg-blue-800 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-blue-900 px-6 py-4 flex justify-between items-center">
        <h1
            onClick={() => navigate('/')}
            className="text-2xl font-bold text-white cursor-pointer hover:text-blue-200 transition"
            >
            PayLane
        </h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-white text-blue-900 text-sm font-semibold px-4 py-2 rounded-full hover:bg-blue-50 transition"
        >
          Back to Dashboard
        </button>
      </nav>

      <div className="max-w-md mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Send Money</h2>

        <div className="bg-white rounded-3xl p-8 shadow-sm">
          {/* Balance */}
          <div className="bg-blue-50 rounded-2xl p-4 mb-6 flex justify-between items-center">
            <div>
              <p className="text-blue-600 text-sm">Available Balance</p>
              <p className="text-2xl font-bold text-blue-900">
                {currency === 'USD' ? '$' : '₦'}{balance.toLocaleString()}
              </p>
            </div>
            {/* Currency Toggle */}
            <div className="flex bg-blue-200 rounded-full p-1">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1 rounded-full text-sm font-semibold transition ${currency === 'USD' ? 'bg-white text-blue-900' : 'text-blue-800'}`}
              >
                USD
              </button>
              <button
                onClick={() => setCurrency('NGN')}
                className={`px-3 py-1 rounded-full text-sm font-semibold transition ${currency === 'NGN' ? 'bg-white text-blue-900' : 'text-blue-800'}`}
              >
                NGN
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Name or Email</label>
            <input
              type="text"
              placeholder="e.g. John Doe or john@email.com"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount ({currency === 'USD' ? '$' : '₦'})
            </label>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Note (optional)</label>
            <input
              type="text"
              placeholder="What's this for?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleSend}
            className="w-full bg-blue-700 text-white font-semibold py-4 rounded-full hover:bg-blue-800 transition"
          >
            Send Money
          </button>
        </div>
      </div>
    </div>
  )
}

export default SendMoney