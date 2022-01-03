import React from 'react'
import styled from 'styled-components'
import { BorderTab } from './tabs'

const Wrapper = styled.div`
  display: flex;
  overflow: auto;
  white-space: nowrap;
`

const Status = styled(BorderTab)`
  min-width: 9rem;
  overflow: auto;
`

const StatusTab = ({ statusData, handleChangeStatus, statusFilter }) => {
  return (
    <Wrapper>
      {statusData.map((status, index) => {
        return (
          <Status
            key={index}
            onClick={() => {
              handleChangeStatus(status)
            }}
            $isActive={statusFilter === status ? true : false}
          >
            {status}
          </Status>
        )
      })}
    </Wrapper>
  )
}

export default StatusTab
