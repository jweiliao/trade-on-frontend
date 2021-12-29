import React, { useContext } from 'react'
import styled from 'styled-components'
import AuthContext from '../../contexts'
import { Link } from 'react-router-dom'
import { SmallButton } from '../../components/buttons'
import { Img, ImgCircleWrapper } from '../../components/img'
import { MEDIA_QUERY_SM } from '../../styles/breakpoints'
import shippingMethod from '../../constants/shippingMethod'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Avatar = styled(ImgCircleWrapper)`
  width: 8rem;
  height: 8rem;
`

const User = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  width: 80%;
  ${MEDIA_QUERY_SM} {
    max-width: 100%;
  }
`

const Email = styled.p`
  line-height: 1.5;
  font-size: 1.2rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const NickName = styled.span`
  line-height: 1.5;
  font-size: 1.2rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const Introduce = styled.p`
  line-height: 1.5;
  font-size: 1.2rem;
  max-width: 80%;
  ${MEDIA_QUERY_SM} {
    max-width: 100%;
  }
`

const PreferTradeMode = styled.p`
  font-size: 1.125rem;
  line-height: 1.5;
`
const TransactionTypeContent = styled.p`
  margin: 1rem 0;
  line-height: 1;
  position: relative;
  padding-left: 1.75rem;
  opacity: ${({ $isSelected }) => {
    return $isSelected ? (props) => 1 : (props) => 0.3
  }};
  :before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    height: 1rem;
    width: 1rem;
    border: 0.1rem solid
      ${({ $isSelected }) => {
        return $isSelected
          ? (props) => (props) => props.theme.primary_200
          : (props) => (props) => props.secondary
      }};
    border-radius: 0.25rem;
    background: ${({ $isSelected }) => {
      return $isSelected
        ? (props) => (props) => props.theme.primary_200
        : (props) => (props) => props.theme.general_000
    }};
  }
  :after {
    content: '';
    position: absolute;
    left: 0.35rem;
    top: 0.15rem;
    width: 0.3rem;
    height: 0.6rem;
    border: solid white;
    border-width: 0 0.2rem 0.2rem 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`

const Account = styled(PreferTradeMode)``

const EditButton = styled(SmallButton)`
  margin-top: 1rem;
`

const UserInfo = ({ userData }) => {
  const { faceToFace, sevenEleven, familyMart } = shippingMethod
  const { user } = useContext(AuthContext)
  const preferDealMethods = user.preferDealMethods

  return (
    <Wrapper>
      <Avatar>
        <Img src={userData && userData.avatarUrl} />
      </Avatar>
      <User>
        <Email>{userData && userData.email}</Email>
        <NickName>{userData && `(${userData.nickname})`}</NickName>
      </User>
      <Introduce>{userData && userData.introduction}</Introduce>
      {userData && user && userData.id === user.id && (
        <>
          <PreferTradeMode>
            偏好交易方式：
            <TransactionTypeContent
              $isSelected={
                preferDealMethods.convenientStores &&
                preferDealMethods.convenientStores.includes('全家')
              }
            >
              {familyMart}
            </TransactionTypeContent>
            <TransactionTypeContent
              $isSelected={
                preferDealMethods.convenientStores &&
                preferDealMethods.convenientStores.includes('7-11')
              }
            >
              {sevenEleven}
            </TransactionTypeContent>
            <TransactionTypeContent $isSelected={preferDealMethods.faceToFace}>
              {faceToFace}
            </TransactionTypeContent>
          </PreferTradeMode>
          <Account>
            匯款資訊：
            {user.account
              ? `(${user.account.bankCode})${user.account.accountNum}`
              : '未填寫'}
          </Account>
          <EditButton as={Link} to="/portfolio/edit">
            編輯
          </EditButton>
        </>
      )}
    </Wrapper>
  )
}

export default UserInfo
