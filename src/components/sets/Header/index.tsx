import styled from 'styled-components'
import logoImg from '../../../assets/Logo.svg'
import GreenButton from '../../models/GreenButton'
import * as Dialog from '@radix-ui/react-dialog'
import NewTransactionModal from '../NewTransactionModal'

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <GreenButton height={'50px'}>Nova transação</GreenButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  background: ${(props) => props.theme['gray-900']};
  padding: 2.4rem 0 7.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const HeaderContent = styled.section`
  width: 1120px;
  max-width: 100%;
  padding: 0 1.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`
