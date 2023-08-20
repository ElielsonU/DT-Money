import styled from 'styled-components'

const DarkInput = styled.input`
  border-radius: 6px;
  border: 0;
  background-color: ${(props) => props.theme['gray-900']};
  color: ${(props) => props.theme['gray-300']};
  padding: 1rem;

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }
`

export default DarkInput
