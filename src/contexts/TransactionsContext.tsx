import { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { dateFormatter } from '../utils/formatter'
import { api } from '../lib/axios'
import { createContext } from 'use-context-selector'

export type TransactionType = {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string | Date
  priceFormatted: string
  dateFormatted: string
}

type CreateTransactionInput = {
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
}

interface TransactionContextType {
  transactions: TransactionType[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

export const TransactionsContext = createContext<TransactionContextType>(
  {} as TransactionContextType,
)

interface TransactionProviderType extends PropsWithChildren {}

export default function TransactionsProvider({
  children,
}: TransactionProviderType) {
  const [transactions, setTransactions] = useState<TransactionType[]>([])

  const formatTransaction = (transaction: TransactionType) => {
    transaction.priceFormatted = Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(Number(transaction.price))
    transaction.dateFormatted = dateFormatter.format(
      new Date(transaction.createdAt),
    )
    return transaction
  }

  const fetchTransactions = useCallback(
    async (query?: string) => {
      const res = await api.get('/transactions', {
        params: {
          q: query,
          _sort: 'createdAt',
          _order: 'desc',
        },
      })

      const newTransaction = res.data.map(formatTransaction)

      if (JSON.stringify(transactions) !== JSON.stringify(newTransaction)) {
        setTransactions(newTransaction)
      }
    },
    [transactions],
  )

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const res = await api.post('/transactions', {
        ...data,
        createdAt: new Date(),
      })

      const newTransaction = formatTransaction(res.data)

      setTransactions((state) => [newTransaction, ...state])
    },
    [setTransactions],
  )

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
