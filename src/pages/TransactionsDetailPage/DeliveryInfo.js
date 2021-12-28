import React from 'react'
import styled from 'styled-components'
import {
  InputLabel,
  Input,
  InputErrorMessage,
} from '../../components/textField'
import dealStatus from '../../constants/dealStatus'

const Content = styled.div`
  height: 25rem;
  overflow: auto;
  border: 1px solid ${(props) => props.theme.general_300};
  border-radius: 4px;
  margin: 0.5rem;
  padding: 1.5rem;
`

const Detail = styled.p`
  font-size: 1.125rem;
  line-height: 1.5;
`

const InputText = styled(Input)`
  width: 100%;
`

const DeliveryInfo = ({
  isGiver,
  status,
  tradeRecord,
  errorMessages,
  shippingInfo,
  handleChange,
}) => {
  const { toFillInfo, toCharge, delivering, isCompleted, isCanceled } =
    dealStatus

  switch (status) {
    case toFillInfo:
      return (
        <Content>
          {status === toFillInfo &&
            (isGiver ? (
              <Detail>請等待索取者填寫店到店資訊</Detail>
            ) : (
              <>
                <Detail>請填寫店到店資訊</Detail>
                <InputLabel>姓名</InputLabel>
                <InputText
                  placeholder="輸入取件者姓名"
                  name="name"
                  value={shippingInfo.name}
                  onChange={handleChange}
                />
                {errorMessages.name && (
                  <InputErrorMessage>{errorMessages.name}</InputErrorMessage>
                )}
                <InputLabel>手機</InputLabel>
                <InputText
                  placeholder="輸入手機"
                  name="cellPhone"
                  value={shippingInfo.cellPhone}
                  onChange={handleChange}
                />
                {errorMessages.cellPhone && (
                  <InputErrorMessage>
                    {errorMessages.cellPhone}
                  </InputErrorMessage>
                )}
                <InputLabel>店號</InputLabel>
                <InputText
                  placeholder="輸入店號"
                  name="storeCode"
                  value={shippingInfo.storeCode}
                  onChange={handleChange}
                />
                {errorMessages.storeCode && (
                  <InputErrorMessage>
                    {errorMessages.storeCode}
                  </InputErrorMessage>
                )}
                <InputLabel>店名</InputLabel>
                <InputText
                  placeholder="輸入店名"
                  name="storeName"
                  value={shippingInfo.storeName}
                  onChange={handleChange}
                />
                {errorMessages.storeName && (
                  <InputErrorMessage>
                    {errorMessages.storeName}
                  </InputErrorMessage>
                )}
              </>
            ))}
        </Content>
      )

    case toCharge:
      return (
        <Content>
          {isGiver ? (
            <Detail>請等待索取者將運費轉帳給您</Detail>
          ) : (
            <Detail>請將運費轉帳給贈送者</Detail>
          )}
          <Detail>運費：60 元</Detail>
          <Detail>
            帳號：({tradeRecord.owner && tradeRecord.owner.account.bankCode})
            {tradeRecord.owner && tradeRecord.owner.account.accountNum}
          </Detail>
        </Content>
      )

    case delivering:
      return (
        <Content>
          {tradeRecord.dealMethod && tradeRecord.dealMethod.faceToFace ? (
            <>
              <Detail>
                面交區域：
                {tradeRecord.dealMethod &&
                  tradeRecord.dealMethod.faceToFace.region +
                    tradeRecord.dealMethod.faceToFace.district}
              </Detail>
              <Detail>詳細的面交地點及面交時間，請與對方聯絡</Detail>
            </>
          ) : (
            <>
              <Detail>
                姓名：{tradeRecord.sendingInfo && tradeRecord.sendingInfo.name}
              </Detail>
              <Detail>
                手機：
                {tradeRecord.sendingInfo && tradeRecord.sendingInfo.cellPhone}
              </Detail>
              <Detail>
                店號：
                {tradeRecord.sendingInfo && tradeRecord.sendingInfo.storeCode}
              </Detail>
              <Detail>
                店名：
                {tradeRecord.sendingInfo && tradeRecord.sendingInfo.storeName}
              </Detail>
            </>
          )}
        </Content>
      )

    case isCompleted:
      return (
        <Content>
          <Detail>恭喜您完成交易！</Detail>
        </Content>
      )

    case isCanceled:
      return (
        <Content>
          <Detail>交易已被取消</Detail>
        </Content>
      )

    default:
      return <Content></Content>
  }
}

export default DeliveryInfo
