import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Container from '../../components/Container'
import { PageTitle } from '../../components/heading'
import { SubTitle } from '../../components/heading'

// 引入 axios 來帶後端的資料
import { instance as axios } from '../../WebAPI'

/* 所有問答內容的整個區塊 */
const FaqContent = styled.div`
  margin-top: 36px;
  margin-bottom: 50px;
`

/* 每一條常見問答的區塊 */
const FaqItems = styled.div`
  padding-bottom: 16px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${(props) => props.theme.general_200};
  & + & {
    margin-top: 40px;
  }
`
/* 問題 */
const FaqQuestion = styled(SubTitle)`
  cursor: pointer;
`

/* 回答 */
const FaAnswer = styled.div`
  margin-top: 20px;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.5px;
`

export default function FaqPage() {
  // 設定問答資料 state
  const [faqData, setFaqData] = useState([])

  // 第一次進入頁面時，撈後端資料，並帶入 faqData 的 state
  useEffect(() => {
    axios
      .get('/commonqnas/all')
      .then((result) => {
        setFaqData(result.data.allQAs)
        // console.log(result.data.allQAs)
      })
      .catch((err) => console.log(err))
  }, [])

  // 點擊 "問題" 後，執行 handleQuestionClick，更新 faqData 的 state ，
  // 1. 將點擊的這筆問題的 id 與 faqData 資料中每一筆 id 比對，
  // 2. 匹對後將這筆問題的 isShowed 設為 toggle，
  // 3. 透過更新資料流，藉此控制是否顯示回答
  const handleQuestionClick = (clickedItem) => {
    setFaqData(
      faqData.map((item) => {
        if (clickedItem.id === item.id) {
          return {
            ...item,
            isShowed: !item.isShowed,
          }
        }
        return item
      })
    )
  }
  return (
    <>
      <Container>
        {/* 標題 */}
        <PageTitle>常見問題</PageTitle>

        {/* 所有問答內容的整個區塊 */}
        <FaqContent>
          {/* 撈出 faqData 的每一筆資料 */}
          {faqData.map((item) => {
            return (
              <FaqItems key={item.id}>
                {/* 問題 */}
                {/* 點擊 "問題" 後，執行 handleQuestionClick */}
                <FaqQuestion onClick={() => handleQuestionClick(item)}>
                  {item.question}
                </FaqQuestion>

                {/* 回答 */}
                {/* 如果 item.isShowed 為 true，則顯示回答 */}
                {item.isShowed && <FaAnswer>{item.answer}</FaAnswer>}
              </FaqItems>
            )
          })}
        </FaqContent>
      </Container>
    </>
  )
}
