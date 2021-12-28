import React from 'react'
import styled from 'styled-components'
import { Img, ImgWrapper } from '../../components/img'
import shippingMethod from '../../constants/shippingMethod'

const ObjectImage = styled(ImgWrapper)`
  min-width: 7rem;
  min-height: 7rem;
  max-width: 7rem;
  max-height: 7rem;
  margin: 1rem auto;
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`

const ObjectName = styled.p`
  line-height: 2;
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 98%;
`

const Quantity = styled(ObjectName)`
  font-weight: normal;
`

const TradeMode = styled(Quantity)``

const Number = styled(Quantity)``

const DealInfo = ({ transaction }) => {
  const { faceToFace, sevenEleven, familyMart } = shippingMethod

  return (
    <>
      <ObjectImage>
        <Img src={transaction.post && transaction.post.imgUrls[0]} />
      </ObjectImage>
      <TextWrapper>
        <ObjectName>{transaction.post && transaction.post.itemName}</ObjectName>
        <Quantity>數量：{transaction.amount}</Quantity>
        <TradeMode>
          交易方式：
          {(transaction.dealMethod &&
            transaction.dealMethod.faceToFace &&
            faceToFace) ||
            (transaction.dealMethod &&
            transaction.dealMethod.convenientStore === '全家'
              ? familyMart
              : sevenEleven)}
        </TradeMode>
        <Number>交易編號：{transaction.id}</Number>
      </TextWrapper>
    </>
  )
}

export default DealInfo
