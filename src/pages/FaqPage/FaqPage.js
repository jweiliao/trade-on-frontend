import React from 'react'
import styled from 'styled-components'
import Container from '../../components/Container'
import { PageTitle } from '../../components/heading'
import { SubTitle } from '../../components/heading'
import Pagination from '../../components/Pagination/Pagination'
import useFaqs from '../../hooks/useFaqs'

const Faqs = styled.div``

const Faq = styled.div`
  padding: 1.75rem 0;
  :first-of-type {
    padding-top: 0;
  }
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${(props) => props.theme.general_300};
`

const Question = styled(SubTitle)`
  cursor: pointer;
  margin-bottom: 0;
`

const Answer = styled.div`
  margin-top: 1.2rem;
  line-height: 1.5;
  letter-spacing: 0.5px;
  white-space: pre-line;
`

export default function FaqPage() {
  const {
    faqs,
    currentFaqs,
    handleToggleFaq,
    faqsPerPage,
    currentPage,
    handleChangePage,
  } = useFaqs()

  return (
    <Container>
      <PageTitle>常見問題</PageTitle>
      <Faqs>
        {currentFaqs.map((item) => {
          return (
            <Faq key={item.id}>
              <Question onClick={() => handleToggleFaq(item)}>
                {item.question}
              </Question>
              {item.isShowed && <Answer>{item.answer}</Answer>}
            </Faq>
          )
        })}
      </Faqs>
      <Pagination
        dataPerPage={faqsPerPage}
        totalData={faqs.length}
        handleChangePage={handleChangePage}
        currentPage={currentPage}
      />
    </Container>
  )
}
