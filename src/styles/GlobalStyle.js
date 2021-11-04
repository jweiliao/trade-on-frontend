import { createGlobalStyle } from 'styled-components'
export const GlobalStyle = createGlobalStyle`
  * {
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
  font-family: 'Noto Sans TC', sans-serif;
  }
  body,
  html,
  #root {
    width: 100%;
    letter-spacing: 0.003rem;
    color: ${(props) => props.theme.secondary};
  }
  body {
    padding-top: 64px;
  }
  a {
    text-decoration: none;
    outline: none;
  }
  hr {
    border: 0;
    border-top: 0.1rem solid ${(props) => props.theme.general_500};
    width: 100%;
  }
`
