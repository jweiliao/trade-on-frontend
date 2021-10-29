import styled from 'styled-components'
import { FooterData } from './FooterData'
import { Link } from 'react-router-dom'
import { MEDIA_QUERY_SM, MEDIA_QUERY_MD } from '../../styles/breakpoints'

const FooterRow = styled.footer`
  background-color: ${(props) => props.theme.general_400};
  padding: 50px 0 20px 0;
`
const FooterArea = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 1040px;
  margin: 0 auto;
  ${MEDIA_QUERY_MD} {
    margin: 10px 15px;
  }
`
const FooterUl = styled.ul`
  ${MEDIA_QUERY_SM} {
    width: 50%;
  }
`
const FooterLi = styled.li`
  align-items: center;
  padding: 5px 0;
  font-size: 16px;
  &:first-child {
    font-weight: 500;
    font-size: 18px;
  }
`
const FooterLink = styled(Link)`
  color: ${(props) => props.theme.secondary};
  font-weight: normal;
  &:hover {
    color: ${(props) => props.theme.general_700};
  }
`
const Copyright = styled.div`
  text-align: center;
  margin-top: 40px;
`

export const Footer = () => {
  return (
    <FooterRow>
      <FooterArea>
        <FooterUl>
          {FooterData.about.map((item, index) => {
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
                  <FooterLink
                    to={item.link}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {item.title}
                  </FooterLink>
                ) : (
                  item.title
                )}
              </FooterLi>
            )
          })}
        </FooterUl>
      </FooterArea>
      <Copyright>&copy; 2021 TRADE ON All rights reserved.</Copyright>
    </FooterRow>
  )
}
