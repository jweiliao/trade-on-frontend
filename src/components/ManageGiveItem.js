import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Input } from './textField'
import { BackstageTitle } from './heading'
import { SmallButton } from './buttons'
import Swal from 'sweetalert2'
import { MEDIA_QUERY_SM } from '../styles/breakpoints'

// 引入接受索取請求、拿取所有交易資料的 API
import { acceptTransaction, getAllTransactions } from '../WebAPI'

// 引入 InputErrorMessage 這個 component
import { InputErrorMessage } from './textField'

// 引入操作 "給他禮物" 按鈕的 hook
import useGiveItem from './../hooks/useGiveItem'

/* 彈窗底下的遮罩 */
const BackDrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 50;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
`

/* 整個贈與禮物的彈窗 */
const GiveItemWrapper = styled.div`
  z-index: 100;
  width: 500px;
  padding: 10px 50px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid ${(props) => props.theme.general_500};
  border-radius: 4px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  transition: all 0.5s ease-out;
  ${MEDIA_QUERY_SM} {
    margin-top: 20px;
    max-width: 80%;
  }
`

/* 贈與禮物彈窗的標題 */
const Title = styled(BackstageTitle)`
  font-weight: 500;
  padding-bottom: 7px;
  text-align: left;
  border-bottom: 2px solid ${(props) => props.theme.general_500};

  ${MEDIA_QUERY_SM} {
    margin-top: 3rem;
  }
`
/* 贈與項目的細節 */
const GiveDetail = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 20px;
  margin-bottom: 30px;
`

/* 收款資訊  */
const BankInfo = styled.div`
  margin-top: 30px;
`

/* 收款資訊輸入欄  */
const BankInfoInput = styled(Input)`
  width: 100%;
  border-color: ${(props) => props.theme.general_500};
  &:focus {
    border-color: ${(props) => props.theme.general_600};
  }
`

/* 彈窗下方操作按鈕們的全部區塊 */
const ConfirmButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  ${MEDIA_QUERY_SM} {
    flex-direction: column;
    align-items: center;
  }
`

/* "取消" 按鈕 */
const CancelButton = styled(SmallButton)`
  background-color: ${(props) => props.theme.general_200};
  &:hover {
    background-color: ${(props) => props.theme.general_300};
  }
  ${MEDIA_QUERY_SM} {
    width: 100%;
  }
`

/* "確認" 按鈕 */
const GiveButton = styled(SmallButton)`
  margin-left: 27px;
  background-color: ${(props) => props.theme.primary_100};
  :hover {
    background-color: ${(props) => props.theme.primary_200};
  }
  ${MEDIA_QUERY_SM} {
    width: 100%;
    margin-top: 20px;
    margin-left: 0px;
  }
`

export default function ManageGiveItem({
  post,
  postMessageId,
  applyDealMethod,
  handleToggleGivePopUp,
  applyMsgId,
  isDealLimit,
  setIsDealLimit,
  setApplyMsgIsDealing,
}) {
  const { errorMessages, handleInput, handleGiveItem, confirmGiveItem } =
    useGiveItem(handleToggleGivePopUp, applyMsgId)

  return (
    <>
      {/* 彈窗底下的遮罩，點擊彈窗以外的地方，會收回彈窗  */}
      <BackDrop onClick={handleToggleGivePopUp}></BackDrop>
      {/* 整個贈與禮物的彈窗 */}
      <GiveItemWrapper>
        <Title>贈與物品</Title>
        <GiveDetail>物品名稱：{post ? post.itemName : '暫無'}</GiveDetail>
        <GiveDetail>物品數量： {post ? 1 : 0} 個</GiveDetail>
        {/* 顯示索取者選擇的寄送方式 */}
        <GiveDetail>
          寄送方式：
          {applyDealMethod && (
            <>
              {applyDealMethod.faceToFace
                ? '面交'
                : applyDealMethod.convenientStore === '7-11'
                ? '7-11店到店'
                : '全家店到店'}
            </>
          )}
          {/* 若選擇店到店的寄送方式，下方出現填寫收款資訊的區塊，並在 "確認" 按鈕送出前驗證輸入內容的格式 */}
          {applyDealMethod.convenientStore && (
            <>
              <BankInfo>
                銀行代碼：
                <BankInfoInput
                  name="bankCode"
                  placeholder="請輸入收款銀行的代碼"
                  onChange={handleInput}
                ></BankInfoInput>
                {errorMessages.bankCode && (
                  <InputErrorMessage>
                    {errorMessages.bankCode}
                  </InputErrorMessage>
                )}
              </BankInfo>
              <BankInfo>
                收款帳號：
                <BankInfoInput
                  name="accountNum"
                  placeholder="請輸入收款的銀行帳號"
                  onChange={handleInput}
                ></BankInfoInput>
                {errorMessages.accountNum && (
                  <InputErrorMessage>
                    {errorMessages.accountNum}
                  </InputErrorMessage>
                )}
              </BankInfo>
            </>
          )}
        </GiveDetail>

        {/* 彈窗下方操作按鈕們的全部區塊 */}
        <ConfirmButtonsWrapper>
          {/* 點擊 "取消" 按鈕後，隱藏索取請求的彈窗 */}
          <CancelButton onClick={handleToggleGivePopUp}>取消</CancelButton>

          {/* 如果達到交易數量的極限，則無法繼續贈送，除非有人取消交易 */}

          {/* 點擊 "確認" 按鈕，執行 "handleGiveItem" */}
          <GiveButton
            type="submit"
            disabled={post.isDealLimit}
            onClick={() => {
              handleGiveItem(applyDealMethod)
              confirmGiveItem(setApplyMsgIsDealing)
            }}
          >
            確認
          </GiveButton>
          {post.isDealLimit ? (
            <InputErrorMessage>物品都在交易中，不能再送囉！</InputErrorMessage>
          ) : null}
        </ConfirmButtonsWrapper>
      </GiveItemWrapper>
    </>
  )
}
