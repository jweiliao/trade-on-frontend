import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { getAllFaqs, addFaq, updateFaq, deleteFaq } from '../WebAPI'

export default function useFaqs() {
  const [faqs, setFaqs] = useState([])
  const [currentFaqs, setCurrentFaqs] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const faqsPerPage = 10
  const [popUp, setPopUp] = useState(false)
  const [faqData, setFaqData] = useState({})
  const [errorMessages, setErrorMessages] = useState({})

  useEffect(() => {
    const fetchFaqs = async () => {
      const res = await getAllFaqs()
      setFaqs(res.data.allQAs)
    }

    fetchFaqs()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  useEffect(() => {
    const indexOfLastFaq = currentPage * faqsPerPage
    const indexOfFirstFaq = indexOfLastFaq - faqsPerPage
    setCurrentFaqs(faqs.slice(indexOfFirstFaq, indexOfLastFaq))
  }, [currentPage, faqs])

  useEffect(() => {
    if (currentFaqs.length === 0) setCurrentPage(1)
  }, [currentFaqs])

  const validateFaqData = (values) => {
    let errors = {}

    if (!values.question.trim()) {
      errors.question = '此欄位為必填'
    }

    if (!values.answer.trim()) {
      errors.answer = '此欄位為必填'
    }

    return errors
  }

  const handleTogglePopUp = (id, question, answer) => {
    setErrorMessages({})
    setPopUp(!popUp)
    if (id) {
      setFaqData({ id, question, answer })
    } else {
      setFaqData({ question: '', answer: '' })
    }
  }

  const handleInput = (e) => {
    const { name, value } = e.target
    setFaqData({
      ...faqData,
      [name]: value,
    })
    setErrorMessages({
      ...errorMessages,
      [e.target.name]: '',
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (Object.keys(validateFaqData(faqData)).length !== 0) {
      setErrorMessages(validateFaqData(faqData))
      return
    }

    if (faqData.id) {
      updateFaq(faqData.id, faqData).then((res) => {
        const newFaq = res.data.update
        if (res.data.message === 'success') {
          setFaqs(
            faqs.map((faq) => {
              if (faq.id !== newFaq.id) return faq
              return {
                ...faq,
                question: newFaq.question,
                answer: newFaq.answer,
              }
            })
          )
        }
      })
    } else {
      addFaq(faqData).then((res) => {
        const newFaq = res.data.new
        if (res.data.message === 'success') {
          setFaqs([
            ...faqs,
            {
              id: newFaq.id,
              question: newFaq.question,
              answer: newFaq.answer,
            },
          ])
          window.scrollTo(0, document.body.scrollHeight)
          setCurrentPage(Math.ceil((faqs.length + 1) / faqsPerPage))
        }
      })
    }

    handleTogglePopUp()
  }

  const handleDeleteFaq = (id) => {
    Swal.fire({
      title: '刪除',
      text: '確定要刪除嗎？',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e25151',
      cancelButtonColor: '#B7B7B7',
      cancelButtonText: '不，取消刪除',
      confirmButtonText: '是的，我要刪除',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFaq(id).then((res) => {
          if (res.data.message === 'success') {
            setFaqs(faqs.filter((faq) => faq.id !== id))
          }
        })
      }
    })
  }

  const handleToggleFaq = (clickedFaq) => {
    setCurrentFaqs(
      currentFaqs.map((faq) => {
        if (clickedFaq.id === faq.id) {
          return {
            ...faq,
            isShowed: !faq.isShowed,
          }
        }
        return faq
      })
    )
  }

  const handleChangePage = (pageNumber) => setCurrentPage(pageNumber)

  return {
    faqs,
    currentFaqs,
    popUp,
    handleTogglePopUp,
    handleInput,
    faqData,
    errorMessages,
    handleSubmit,
    handleDeleteFaq,
    handleToggleFaq,
    faqsPerPage,
    currentPage,
    handleChangePage,
  }
}
