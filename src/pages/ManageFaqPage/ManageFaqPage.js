import React from 'react'
import styled from 'styled-components'
import { PageTitle } from '../../components/heading'
import Container from '../../components/Container'
import {
  BackstageSmallButton,
  DangerSmallButton,
} from '../../components/buttons'
import Pagination from '../../components/Pagination/BackstagePagination'
import { MEDIA_QUERY_SM } from '../../styles/breakpoints'
import FaqPopUp from '../../components/PopUp/FaqPopUp'
import useFaqs from '../../hooks/useFaqs'

const AddButton = styled(BackstageSmallButton)``

const Faqs = styled.div`
  display: flex;
  flex-direction: column;
`

const Faq = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.general_500};
  padding: 1.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${MEDIA_QUERY_SM} {
    flex-direction: column;
  }
`

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
  ${MEDIA_QUERY_SM} {
    width: 100%;
    margin-right: 0;
  }
`

const Question = styled.h3`
  font-size: 1.375rem;
  font-weight: 500;
  line-height: 2rem;
  margin-bottom: 1.25rem;
`

const Answer = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  letter-spacing: 0.5px;
  white-space: pre-line;
`

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  ${MEDIA_QUERY_SM} {
    flex-direction: row;
    width: 100%;
    margin-top: 1.25rem;
    justify-content: center;
  }
`

const EditButton = styled(AddButton)``

const DeleteButton = styled(DangerSmallButton)`
  margin-top: 1rem;
  ${MEDIA_QUERY_SM} {
    margin-top: 0rem;
    margin-left: 1rem;
  }
`

export default function ManageFaqPage() {
  const {
    faqs,
    currentFaqs,
    popUp,
    handleTogglePopUp,
    handleInput,
    faqData,
    errorMessages,
    handleSubmit,
    handleDeleteFaq,
    faqsPerPage,
    currentPage,
    handleChangePage,
  } = useFaqs()

  return (
    <Container>
      <PageTitle>常見問題管理</PageTitle>
      <AddButton onClick={() => handleTogglePopUp()}>新增問答</AddButton>
      <Faqs>
        {currentFaqs.map((faq) => {
          return (
            <Faq key={faq.id}>
              <Contents>
                <Question>{faq.question}</Question>
                <Answer>{faq.answer}</Answer>
              </Contents>
              <Buttons>
                <EditButton
                  onClick={() =>
                    handleTogglePopUp(faq.id, faq.question, faq.answer)
                  }
                >
                  編輯
                </EditButton>
                <DeleteButton onClick={() => handleDeleteFaq(faq.id)}>
                  刪除
                </DeleteButton>
              </Buttons>
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
      {popUp && (
        <FaqPopUp
          handleTogglePopUp={handleTogglePopUp}
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          faqData={faqData}
          errorMessages={errorMessages}
        />
      )}
    </Container>
  )
}
