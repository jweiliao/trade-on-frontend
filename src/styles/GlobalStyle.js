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
  a {
    text-decoration: none;
  }
`
