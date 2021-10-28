import styled from 'styled-components'

export const Input = styled.input`
  display: block;
  height: 2.5rem;
  margin: 1.2rem 0;
  padding: 0 0.5rem;
  border: 0.1rem solid ${(props) => props.theme.secondary};
  border-radius: 0.25rem;
  outline: none;
`

export const InputPassword = styled(Input).attrs({ type: 'password' })``
