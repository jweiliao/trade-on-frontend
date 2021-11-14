import React, { useState } from 'react'
import styled from 'styled-components'
import Container from '../../components/Container'
import { PageTitle } from '../../components/heading'
import { SubTitle } from '../../components/heading'

const faqQuestions = [
  {
    question: '請問如何贈物?',
    answer: `點擊 "上傳禮物" 後，輸入要贈物的資料，完成後即可等待索物方請求 `,
    id: 1,
    isShowed: false,
  },
  {
    question: '請問如何索物?',
    answer: `選擇想要索物的物品後，點擊 "想要禮物"，輸入資料後等待贈物者的給予 `,
    id: 2,
    isShowed: false,
  },
]

const FaqContent = styled.div`
  margin-top: 36px;
  margin-bottom: 50px;
`
const FaqItems = styled.div`
  padding-bottom: 16px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${(props) => props.theme.general_200};
  & + & {
    margin-top: 40px;
  }
`
const FaqQuestion = styled(SubTitle)`
  cursor: pointer;
`
const FaAnswer = styled.div`
  margin-top: 20px;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.5px;
`

export default function FaqPage() {
  const [faqData, setFaqData] = useState(faqQuestions)
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
        <FaqContent>
          {faqData.map((item) => {
            return (
              <FaqItems key={item.id}>
                <FaqQuestion onClick={() => handleQuestionClick(item)}>
                  {item.question}
                </FaqQuestion>
                {item.isShowed && <FaAnswer>{item.answer}</FaAnswer>}
              </FaqItems>
            )
          })}
        </FaqContent>
      </Container>
    </>
  )
}
