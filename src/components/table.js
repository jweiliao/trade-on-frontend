import styled from 'styled-components'
import { MEDIA_QUERY_SM } from '../styles/breakpoints'

export const Table = styled.table`
  border-collapse: collapse;
  margin: 0 auto;
  width: 100%;
  table-layout: fixed;
`

export const Head = styled.thead`
  ${MEDIA_QUERY_SM} {
    display: none;
  }
`

export const Row = styled.tr`
  :first-child {
    border-top: 1px solid ${(props) => props.theme.general_500};
  }
  border-bottom: 1px solid ${(props) => props.theme.general_500};
  border-right: 0px;
  border-left: 0px;
  ${MEDIA_QUERY_SM} {
    display: block;
    padding: 0.625rem; 0;
  }
`

export const Heading = styled.th`
  padding: 0.625rem;
  text-align: center;
  font-size: 1.125rem;
  letter-spacing: 0.1rem;
`

export const Body = styled.tbody``

export const Data = styled.td`
  padding: 0.625em;
  text-align: center;
  line-height: 1.2;
  overflow: auto;
  position: relative;
  ${MEDIA_QUERY_SM} {
    display: block;
    text-align: right;
    padding-left: 5rem;
    ::before {
      content: attr(data-label);
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      font-weight: bold;
    }

    :last-child {
      border-bottom: 0;
    }
  }
`

export const ButtonTableCell = styled(Data)`
  ${MEDIA_QUERY_SM} {
    padding-left: 0;
  }
`
