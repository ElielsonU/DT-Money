import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    *:focus {
        outline: none;
        box-shadow: 0 0 5px 1px ${(props) => props.theme['green-500']};
    }

    body {
        background-color: ${(props) => props.theme['gray-800']};
        color: ${(props) => props.theme['gray-100']};
        -webkit-font-smoothing: antialiased;
    }
    
    body, input, textarea, button {
        font: 400 1rem Roboto, sans-serif;
    }
`

export default GlobalStyle
