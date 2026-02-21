import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { dummyUser, dummyTransactions } from '../data/dummy'

const Dashboard = () => {
  const navigate = useNavigate()
  const userName = localStorage.getItem('userName') || dummyUser.name
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD')
  const [rawBalance, setRawBalance] = useState(
    Number(localStorage.getItem('balance')) || dummyUser.balance
  )

  const exchangeRate = 1600

  useEffect(() => {
  const handleUpdate = () => {
    const updated = Number(localStorage.getItem('balance')) || dummyUser.balance
    setRawBalance(updated)
  }

  window.addEventListener('focus', handleUpdate)
  window.addEventListener('storage', handleUpdate)
  handleUpdate()

  return () => {
    window.removeEventListener('focus', handleUpdate)
    window.removeEventListener('storage', handleUpdate)
  }
}, [])

  const balance = currency === 'USD'
    ? `$${rawBalance.toLocaleString()}`
    : `₦${(rawBalance * exchangeRate).toLocaleString()}`

  const formatAmount = (amount: number) => {
    return currency === 'USD'
      ? `$${amount.toLocaleString()}`
      : `₦${(amount * exchangeRate).toLocaleString()}`
  }

  const savedTransactions = JSON.parse(localStorage.getItem('transactions') || '[]')
  const allTransactions = [...savedTransactions, ...dummyTransactions]

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
        <div className="flex items-center gap-4">
          <span className="text-blue-200 text-sm">Hi, {userName}</span>
          <button
              onClick={() => {
                localStorage.clear()
                navigate('/login')
             }}
             className="bg-white text-blue-900 text-sm font-semibold px-4 py-2 rounded-full hover:bg-blue-50 transition"
            >
             Logout
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Balance Card */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 rounded-3xl p-8 text-white mb-8">
          <div className="flex justify-between items-start mb-2">
            <p className="text-blue-200 text-sm">Total Balance</p>
            {/* Currency Toggle */}
            <div className="flex bg-blue-700 rounded-full p-1">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-4 py-1 rounded-full text-sm font-semibold transition ${currency === 'USD' ? 'bg-white text-blue-900' : 'text-white'}`}
              >
                USD
              </button>
              <button
                onClick={() => setCurrency('NGN')}
                className={`px-4 py-1 rounded-full text-sm font-semibold transition ${currency === 'NGN' ? 'bg-white text-blue-900' : 'text-white'}`}
              >
                NGN
              </button>
            </div>
          </div>
          <h2 className="text-5xl font-bold mb-6">{balance}</h2>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/send-money')}
              className="bg-white text-blue-900 font-semibold px-6 py-3 rounded-full hover:bg-blue-50 transition"
            >
              Send Money
            </button>
            <button
              onClick={() => navigate('/transactions')}
              className="border-2 border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-blue-900 transition"
            >
              Transactions
            </button>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Transactions</h3>
          <div className="space-y-4">
            {allTransactions.slice(0, 3).map((tx) => (
              <div key={tx.id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">{tx.description}</p>
                  <p className="text-sm text-gray-400">{tx.date}</p>
                </div>
                <span className={`font-bold text-lg ${tx.type === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
                  {tx.type === 'credit' ? '+' : '-'}{formatAmount(tx.amount)}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/transactions')}
            className="mt-6 w-full text-blue-700 font-semibold text-sm hover:underline"
          >
            View All Transactions →
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard