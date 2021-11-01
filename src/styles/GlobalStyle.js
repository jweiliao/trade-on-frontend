import { createGlobalStyle } from 'styled-components'
import { MEDIA_QUERY_MAX_WIDTH } from './breakpoints'

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
    width: 1040px;
    background-color: ${(props) => props.theme.primary_200};
    margin: 50px 0; 
    width: 100%;
  }
  input {
    border: 1px solid #272343;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 10px 12px;
  }

  select {
    padding: 6px 12px;
  }

  .container {
    max-width: 1040px;
    margin: 0 auto;
    ${MEDIA_QUERY_MAX_WIDTH} {
      padding: 0 22px;
    }
  }

  .sub-title {
    font-size: 24px;
    color: ${(props) => props.theme.secondary};
    display: flex;
    position: relative;
  }

  .sub-title:before {
    background-color: ${(props) => props.theme.primary_200};
    content: '';
    display: block;
    width: 10px;
    Height: 32px;
    margin-right: 14px;
  }
`
