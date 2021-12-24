import React from 'react'
import styled from 'styled-components'
import { SmallButton, DangerSmallButton } from '../../components/buttons'
import dealStatus from '../../constants/dealStatus'

const ButtonsWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CheckButton = styled(SmallButton)`
  margin: 0 1rem;
`

const CancelDealBtn = styled(DangerSmallButton)`
  margin: 0 1rem;
`

const UpdateButtons = ({
  isGiver,
  status,
  tradeRecord,
  handelUpdateStatus,
  handleCancelDeal,
}) => {
  const { toFillInfo, toCharge, delivering } = dealStatus

  return (
    <ButtonsWrapper>
      {(status === toFillInfo ||
        (status === delivering && tradeRecord.dealMethod.faceToFace)) && (
        <CancelDealBtn onClick={() => handleCancelDeal(tradeRecord.id)}>
          取消交易
        </CancelDealBtn>
      )}
      {!isGiver &&
        (status === toFillInfo ||
          status === toCharge ||
          status === delivering) && (
          <CheckButton onClick={() => handelUpdateStatus(tradeRecord.id)}>
            {(status === toFillInfo && '送出資料') ||
              (status === toCharge && '轉帳完成') ||
              (status === delivering && '收到物品')}
          </CheckButton>
        )}
    </ButtonsWrapper>
  )
}

export default UpdateButtons
