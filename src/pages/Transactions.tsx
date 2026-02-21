import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { dummyTransactions } from '../data/dummy'

const Transactions = () => {
  const navigate = useNavigate()
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD')

  const exchangeRate = 1600

  const savedTransactions = JSON.parse(localStorage.getItem('transactions') || '[]')
  const allTransactions = [...savedTransactions, ...dummyTransactions]

  const formatAmount = (amount: number) => {
    return currency === 'USD'
      ? `$${amount.toLocaleString()}`
      : `₦${(amount * exchangeRate).toLocaleString()}`
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
        <div className="flex items-center gap-4">
          {/* Currency Toggle */}
          <div className="flex bg-blue-800 rounded-full p-1">
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
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-white text-blue-900 text-sm font-semibold px-4 py-2 rounded-full hover:bg-blue-50 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Transaction History</h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-green-50 rounded-2xl p-6">
            <p className="text-green-600 text-sm font-medium mb-1">Total Income</p>
            <p className="text-3xl font-bold text-green-700">
                +{formatAmount(allTransactions
                .filter(tx => tx.type === 'credit')
                .reduce((sum, tx) => sum + tx.amount, 0))}
            </p>
          </div>
          <div className="bg-red-50 rounded-2xl p-6">
            <p className="text-red-600 text-sm font-medium mb-1">Total Expenses</p>
            <p className="text-3xl font-bold text-red-700">
              -{formatAmount(allTransactions
                .filter(tx => tx.type === 'debit')
                .reduce((sum, tx) => sum + tx.amount, 0))}
            </p>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6">All Transactions</h3>
          <div className="space-y-4">
            {allTransactions.map((tx) => (
              <div key={tx.id} className="flex justify-between items-center py-4 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${tx.type === 'credit' ? 'bg-green-100' : 'bg-red-100'}`}>
                    {tx.type === 'credit' ? '↓' : '↑'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{tx.description}</p>
                    <p className="text-sm text-gray-400">{tx.date}</p>
                  </div>
                </div>
                <span className={`font-bold text-lg ${tx.type === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
                  {tx.type === 'credit' ? '+' : '-'}{formatAmount(tx.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transactions