import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'
import styled, { useTheme } from 'styled-components'
import { priceFormatter } from '../../../utils/formatter'
import { useSummary } from '../../../hooks/useSummary'

export default function Summary() {
  const theme = useTheme()

  const summary = useSummary()

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>

          <ArrowCircleUp size={32} color="#00b37e" />
        </header>

        <strong>{priceFormatter.format(summary.income)}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Saídas</span>

          <ArrowCircleDown size={32} color={theme['red-300']} />
        </header>

        <strong>{priceFormatter.format(summary.outcome)}</strong>
      </SummaryCard>

      <SummaryCard green={1}>
        <header>
          <span>Total</span>

          <CurrencyDollar size={32} color={theme.white} />
        </header>

        <strong>{priceFormatter.format(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}

const SummaryContainer = styled.section`
  width: 1120px;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: -5rem;
`

interface SummaryCardProps {
  green?: number
}

const SummaryCard = styled.div<SummaryCardProps>`
  background: ${(props) =>
    props.green ? props.theme['green-700'] : props.theme['gray-600']};
  border-radius: 6px;
  padding: 2rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.theme['gray-300']};
  }

  strong {
    display: block;
    margin-top: 1rem;
    font-size: 1.8rem;
    color: ${(props) => props.theme.white};
  }
`
