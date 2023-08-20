import styled from 'styled-components'

interface GreenButtonProps {
  margin?: string
  height?: number | string
  width?: number | string
}

const GreenButton = styled.button<GreenButtonProps>`
  height: ${(props) =>
    typeof props.height === 'number' ? `${props.height}px` : props.height};
  width: ${(props) =>
    typeof props.width === 'number' ? `${props.width}px` : props.width};
  border: 0;
  margin: ${(props) => props.margin};
  background: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;
  transition:
    background-color 0.2s linear,
    box-shadow 0.2s linear;

  &:not(:disabled):hover {
    background: ${(props) => props.theme['green-700']};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export default GreenButton
