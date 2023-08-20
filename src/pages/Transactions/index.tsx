import { styled } from 'styled-components'
import Header from '../../components/sets/Header'
import Summary from '../../components/sets/Summary'
import SearchForm from '../../components/sets/SearchForm'
import { memo } from 'react'
import {
  TransactionsContext,
  TransactionType,
} from '../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

const Transaction = memo(
  function memoTransition(props: { transaction: TransactionType }) {
    return (
      <tr>
        <td width={'50%'}>{props.transaction.description}</td>
        <td>
          <PriceHighlight variant={props.transaction.type}>
            {props.transaction.priceFormatted}
          </PriceHighlight>
        </td>
        <td>{props.transaction.category}</td>
        <td>{props.transaction.dateFormatted}</td>
      </tr>
    )
  },
  (prev, next) => {
    return Object.is(prev.transaction, next.transaction)
  },
)

export default function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  return (
    <div>
      <Header />
      <Summary />̀
      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => (
              <Transaction transaction={transaction} key={transaction.id} />
            ))}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}

const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`

const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  td {
    padding: 1.5rem;
    background: ${(props) => props.theme['gray-700']};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`

interface PriceHighlightProps {
  variant: 'income' | 'outcome'
}

const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${(props) =>
    props.variant === 'income'
      ? props.theme['green-300']
      : props.theme['red-300']};

  &:before {
    content: ${(props) => (props.variant === 'outcome' ? '"-"' : '')};
    display: inline-block;
    margin-right: 0.2rem;
  }
`
