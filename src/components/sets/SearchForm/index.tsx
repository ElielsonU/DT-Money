import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { styled } from 'styled-components'
import * as z from 'zod'
import { TransactionsContext } from '../../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInpus = z.infer<typeof searchFormSchema>

export default function SearchForm() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => context.fetchTransactions,
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInpus>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransactions(data: SearchFormInpus) {
    data.query.trim() && fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}

const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;
  width: 1120px;
  max-width: 100%;
  margin: 0 auto;

  input {
    flex: 1;
    border-radius: 6px;
    border: 0;
    background: ${(props) => props.theme['gray-900']};
    color: ${(props) => props.theme['gray-300']};
    padding: 1rem;
    transition: box-shadow 0.2s ease-in-out;

    &::placeholder {
      color: ${(props) => props.theme['gray-500']};
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    cursor: pointer;

    border: 1px solid ${(props) => props.theme['green-300']};
    padding: 1rem;
    background: transparent;
    color: ${(props) => props.theme['green-300']};
    font-weight: bold;
    border-radius: 6px;
    transition:
      border-color 0.2s,
      background-color 0.2s,
      color 0.2s;

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      border-color: ${(props) => props.theme['green-500']};
      background: ${(props) => props.theme['green-500']};
      color: ${(props) => props.theme.white};
    }
  }
`
