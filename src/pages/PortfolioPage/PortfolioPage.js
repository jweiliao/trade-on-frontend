import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Container from '../../components/Container'
import { SubTitle } from '../../components/heading'
import { SmallButton, PageButton } from '../../components/buttons'
import { TextTab, BorderTab } from '../../components/tabs'
import {
  Cards,
  Card,
  CardImage,
  CardContent,
  CardTitle,
  EmptyCard,
} from '../../components/card'
import { MEDIA_QUERY_SM } from '../../styles/breakpoints'
import { Link } from 'react-router-dom'

const Wrapper = styled(Container)``

const PersonalInfo = styled.div`
  display: flex;
  border: ${(props) => props.theme.general_300} solid 1px;
  padding: 3rem 5%;
  ${MEDIA_QUERY_SM} {
    flex-direction: column;
    align-items: center;
  }
`

const BasicInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 3%;
  ${MEDIA_QUERY_SM} {
    margin: 0;
  }
`

const AvatarWrapper = styled.div`
  width: 8rem;
  height: 8rem;
  position: relative;
`

const Avatar = styled.img`
  max-height: 100%;
  max-width: 100%;
  width: auto;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 50%;
`

const NickName = styled.p`
  text-align: center;
  margin-top: 0.5rem;
  font-size: 1.25rem;
  line-height: 1.5;
  width: 22rem;
  white-space: nowrap;
  overflow: auto;
`
const Email = styled(NickName)``

const EditButton = styled(SmallButton)`
  margin-top: 2rem;
`

const AdvancedInfo = styled.div``

const TransactionType = styled.div`
  min-height: 6.5rem;
  ${MEDIA_QUERY_SM} {
    margin: 3rem 0;
  }
`

const TransactionTypeTitle = styled(SubTitle)`
  font-size: 1.25rem;
`

const TransactionTypeContent = styled.p`
  margin: 1rem 0;
  position: relative;
  padding-left: 2rem;
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

const Introduce = styled(TransactionType)`
  margin-top: 2.5rem;
`

const IntroduceTitle = styled(TransactionTypeTitle)`
  margin-top: 1.5rem;
  ${MEDIA_QUERY_SM} {
    margin: 0;
  }
`

const IntroduceContent = styled.p`
  line-height: 1.5;
  margin: 0.5rem 0;
  height: 6rem;
  overflow: auto;
`

const ActionTabsWrapper = styled.div`
  margin: 4rem 0 1.5rem;
  display: flex;
  justify-content: center;
  text-align: center;
`

const ActionTab = styled(TextTab)`
  font-size: 1.5rem;
  text-align: center;
  margin: 0 2rem;
  width: 3.5rem;
`

const FilterTabsWrapper = styled.div`
  display: flex;
`

const FilterTab = styled(BorderTab)`
  min-width: 9rem;
  overflow: auto;
`

const TransactionsWrapper = styled(Cards)`
  border: ${(props) => props.theme.general_300} solid 1px;
  border-top: 0px;
  padding: 4rem 1rem;
  min-height: 40vh;
`

const PaginationWrapper = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`

export default function PortfolioPage() {
  const [transaction, setTransaction] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setTransaction(data)
      })
  }, [])

  return (
    <Wrapper>
      <PersonalInfo>
        <BasicInfo>
          <AvatarWrapper>
            <Avatar src={`https://i.pravatar.cc/300`} />
          </AvatarWrapper>
          <NickName>萊斯裡有點粉紅</NickName>
          <Email>janejane8491@gmail.com</Email>
          <EditButton as={Link} to="/portfolio/edit">
            編輯
          </EditButton>
        </BasicInfo>
        <AdvancedInfo>
          <TransactionType>
            <TransactionTypeTitle>偏好交易方式</TransactionTypeTitle>
            <TransactionTypeContent>7-11 店到店</TransactionTypeContent>
            <TransactionTypeContent>全家店到店</TransactionTypeContent>
            <TransactionTypeContent $isSelected>面交</TransactionTypeContent>
          </TransactionType>
          <Introduce>
            <IntroduceTitle>自我介紹</IntroduceTitle>
            <IntroduceContent>
              自我介紹內容自我介紹內容自我介紹內容自我介紹內容
            </IntroduceContent>
          </Introduce>
        </AdvancedInfo>
      </PersonalInfo>
      <ActionTabsWrapper>
        <ActionTab to="/portfolio" $isActive>
          贈物
        </ActionTab>
        <ActionTab to="/portfolio">索物 </ActionTab>
      </ActionTabsWrapper>
      <FilterTabsWrapper>
        <FilterTab $isActive>最近一個月</FilterTab>
        <FilterTab>全部</FilterTab>
      </FilterTabsWrapper>
      <TransactionsWrapper>
        {transaction.map((current) => (
          <Card key={current.id} as={Link} to={`/givings/${current.id}`}>
            <CardImage
              src={`https://source.unsplash.com/random/${current.id}`}
            ></CardImage>
            <CardContent>
              <CardTitle>{current.username}</CardTitle>
            </CardContent>
          </Card>
        ))}
        <EmptyCard />
        <EmptyCard />
        <EmptyCard />
        <PaginationWrapper>
          <PageButton>&lt;</PageButton>
          <PageButton>1</PageButton>
          <PageButton>2</PageButton>
          <PageButton>&gt;</PageButton>
        </PaginationWrapper>
      </TransactionsWrapper>
    </Wrapper>
  )
}
