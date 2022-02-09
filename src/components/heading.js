import styled from 'styled-components'

export const PageTitle = styled.h2`
  text-align: center;
  font-size: 1.63rem;
  margin-bottom: 3rem;
`

export const BackstageTitle = styled(PageTitle)`
  margin: 3rem 0;
`

export const SubTitle = styled.h3`
  font-size: 1.375rem;
  font-weight: 500;
  line-height: 2rem;
  margin-bottom: 1.5rem;
  border-left: 0.625rem solid ${(props) => props.theme.primary_200};
  padding-left: 0.8rem;
`
