import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { MEDIA_QUERY_SM } from '../../styles/breakpoints'

const NavbarLink = styled(Link)`
  display: inline-block;
  color: ${(props) => props.theme.general_000};
  padding: 1.35rem 1.25rem;
  :hover {
    color: ${(props) => props.theme.secondary_100};
  }
  ${MEDIA_QUERY_SM} {
    display: flex;
    align-items: center;
    padding: 1.05rem 2.3rem;
    :hover {
      background: ${(props) => props.theme.secondary_100};
      color: ${(props) => props.theme.secondary};
    }
  }
`

const Icon = styled.div`
  display: none;
  ${MEDIA_QUERY_SM} {
    display: inline-block;
    height: 1.5rem;
    width: 1.5rem;
    margin-right: 0.5rem;
    svg {
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
  }
`

const Label = styled.span``

export const BackstageNavbarItem = ({ item, onClick }) => {
  return (
    <NavbarLink to={item.path} onClick={onClick}>
      <Icon>{item.icon}</Icon>
      <Label>{item.title}</Label>
    </NavbarLink>
  )
}
