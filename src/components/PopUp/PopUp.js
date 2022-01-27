import styled from 'styled-components'
import { MEDIA_QUERY_SM } from '../../styles/breakpoints'

const PopUp = styled.div`
  z-index: 100;
  width: 32rem;
  padding: 3rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.general_000};
  border: 1px solid ${(props) => props.theme.general_500};
  border-radius: 0.25rem;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  transition: all 0.5s ease-out;
  label {
    :first-of-type {
      margin-top: 0;
    }
  }
  max-height: 35rem;
  overflow: auto;
  ${MEDIA_QUERY_SM} {
    max-width: 80%;
    padding: 3rem 2rem;
  }
`

export default PopUp
