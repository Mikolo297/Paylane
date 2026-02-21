export interface User {
  id: string
  name: string
  email: string
  balance: number
}

export interface Transaction {
  id: string
  type: 'credit' | 'debit'
  amount: number
  description: string
  date: string
  recipient?: string
}