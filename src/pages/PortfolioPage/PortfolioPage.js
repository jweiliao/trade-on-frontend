import React from 'react'
import styled from 'styled-components'
import Container from '../../components/Container'
import {
  Cards,
  Card,
  CardImage,
  CardContent,
  CardTitle,
  EmptyCard,
} from '../../components/card'
import UserInfo from './UserInfo'
import BehaviorTab from '../../components/BehaviorTab'
import StatusTab from '../../components/StatusTab'
import Pagination from '../../components/Pagination/Pagination'
import { Link } from 'react-router-dom'
import useUserRecord from '../../hooks/useUserRecord'

const TransactionsWrapper = styled(Cards)`
  border: ${(props) => props.theme.general_300} solid 1px;
  border-top: 0px;
  border-radius: 0px 0px 4px 4px;
  padding: 2rem 1.25rem 1rem;
  min-height: 40vh;
`

export default function PortfolioPage() {
  const {
    scrollRef,
    userData,
    behaviorFilter,
    handleChangeBehavior,
    statusData,
    statusFilter,
    handleChangeStatus,
    records,
    currentRecords,
    recordsPerPage,
    handleChangePage,
    currentPage,
  } = useUserRecord()

  return (
    <Container>
      <UserInfo userData={userData} />
      <BehaviorTab
        handleChangeBehavior={handleChangeBehavior}
        behaviorFilter={behaviorFilter}
        scrollRef={scrollRef}
      />
      <StatusTab
        statusData={statusData}
        handleChangeStatus={handleChangeStatus}
        statusFilter={statusFilter}
      />
      <TransactionsWrapper>
        {currentRecords.map((record, index) => (
          <Card
            key={index}
            as={Link}
            to={
              record.post
                ? `/givings/${record.post._id}`
                : `/givings/${record.id}`
            }
          >
            <CardImage
              src={
                (record.imgUrls && record.imgUrls[0]) || record.post.imgUrls[0]
              }
            ></CardImage>
            <CardContent>
              <CardTitle>{record.itemName || record.post.itemName}</CardTitle>
            </CardContent>
          </Card>
        ))}
        <EmptyCard />
        <EmptyCard />
        <EmptyCard />
        <Pagination
          dataPerPage={recordsPerPage}
          totalData={records.length}
          handleChangePage={handleChangePage}
          currentPage={currentPage}
        />
      </TransactionsWrapper>
    </Container>
  )
}
