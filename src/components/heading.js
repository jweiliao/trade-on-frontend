import styled from 'styled-components'

export const PageTitle = styled.h2`
  text-align: center;
  font-size: 1.63rem;
`

export const SubTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 2rem;
  border-left: 0.625rem solid ${(props) => props.theme.primary_200};
  padding-left: 0.8rem;
`
