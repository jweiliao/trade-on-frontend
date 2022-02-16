import styled from 'styled-components'
import { FooterData } from './FooterData'
import { Link } from 'react-router-dom'
import { MEDIA_QUERY_MD } from '../../styles/breakpoints'

const FooterRow = styled.footer`
  background-color: ${(props) => props.theme.general_400};
  padding: 15px 0 15px 0;
`
const FooterArea = styled.div`
  max-width: 1040px;
  margin: 0 auto;
  ${MEDIA_QUERY_MD} {
    margin: 10px 15px;
  }
`
const FooterUl = styled.ul`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
`
const FooterLi = styled.li`
  align-items: center;
  padding: 5px;
  font-size: 16px;
`
const FooterLink = styled(Link)`
  color: ${(props) => props.theme.secondary};
  font-weight: normal;
  &:hover {
    color: ${(props) => props.theme.general_700};
  }
`
const HyperLink = styled.a`
  color: ${(props) => props.theme.secondary};
  font-weight: normal;
  &:hover {
    color: ${(props) => props.theme.general_700};
  }
`

const Copyright = styled.div`
  text-align: center;
  margin-top: 5px;
`

export const Footer = () => {
  return (
    <FooterRow>
      <FooterArea>
        <FooterUl>
          {FooterData.help.map((item, index) => {
            return (
              <FooterLi key={index}>
                {item.link ? (
                  <FooterLink to={item.link}>{item.title}</FooterLink>
                ) : (
                  item.title
                )}
              </FooterLi>
            )
          })}
        </FooterUl>
        <FooterUl>
          {FooterData.follow.map((item, index) => {
            return (
              <FooterLi key={index}>
                {item.link ? (
                  <HyperLink
                    to={item.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    href={item.link}
                  >
                    {item.title}
                  </HyperLink>
                ) : (
                  item.title
                )}
              </FooterLi>
            )
          })}
        </FooterUl>
      </FooterArea>
      <Copyright>&copy; 2022 TRADE ON All rights reserved.</Copyright>
    </FooterRow>
  )
}
