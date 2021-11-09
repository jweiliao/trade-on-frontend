import styled from 'styled-components'
import { MEDIA_QUERY_MAX_WIDTH } from '../styles/breakpoints'

const Container = styled.div`
  max-width: 1040px;
  margin: 3rem auto;
  ${MEDIA_QUERY_MAX_WIDTH} {
    padding: 0 2.5rem;
  }
`
export default Container
