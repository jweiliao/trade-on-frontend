import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Normalize from 'react-normalize'
import { GlobalStyle } from './styles/GlobalStyle'
import { ThemeProvider } from 'styled-components'
import theme from './styles/theme'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Normalize />
    <GlobalStyle />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
)
