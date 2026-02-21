export interface User {
  id: string
  name: string
  email: string
  balance: number
}
export const dummyUser: User = {
  id: '1',
  name: 'Michael Olu',
  email: 'michael@paylane.com',
  balance: 12500.00
}

export interface Transaction {
  id: string
  type: 'credit' | 'debit'      
  amount: number
  description: string
  date: string
  recipient?: string
}
export const dummyTransactions: Transaction[] = [
  { id: '1', type: 'credit', amount: 5000, description: 'Salary', date: '2025-02-01' },
  { id: '2', type: 'debit', amount: 200, description: 'Netflix', date: '2025-02-03' },
  { id: '3', type: 'credit', amount: 1500, description: 'Freelance Payment', date: '2025-02-05' },
  { id: '4', type: 'debit', amount: 450, description: 'Electricity Bill', date: '2025-02-08' },
  { id: '5', type: 'debit', amount: 120, description: 'Groceries', date: '2025-02-10' },
]