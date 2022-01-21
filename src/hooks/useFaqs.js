import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { getAllFaqs, addFaq, updateFaq, deleteFaq } from '../WebAPI'

export default function useFaqs() {
  const [faqs, setFaqs] = useState([])
  const [currentFaqs, setCurrentFaqs] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const faqsPerPage = 10
  const [addPopUp, setAddPopUp] = useState(false)
  const [editPopUp, setEditPopUp] = useState(false)
  const [newFaqData, setNewFaqData] = useState({
    question: '',
    answer: '',
  })
  const [updateFaqData, setUpdateFaqData] = useState({
    question: '',
    answer: '',
  })

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

  const handleToggleAddPopUp = () => {
    setAddPopUp(!addPopUp)
  }

  const handleToggleEditPopUp = (id, question, answer) => {
    setEditPopUp(!editPopUp)
    setUpdateFaqData({ id, question, answer })
  }

  const handleInput = (e) => {
    const { name, value } = e.target
    setNewFaqData({
      ...newFaqData,
      [name]: value,
    })
  }

  const handleAddFaq = (e) => {
    e.preventDefault()
    addFaq(newFaqData).then((res) => {
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
    handleToggleAddPopUp()
  }

  const handleEditInput = (e) => {
    const { name, value } = e.target
    setUpdateFaqData({
      ...updateFaqData,
      [name]: value,
    })
  }

  const handleUpdateFaq = (e) => {
    e.preventDefault()
    updateFaq(updateFaqData.id, updateFaqData).then((res) => {
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
    handleToggleEditPopUp()
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
      backdrop: true,
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

  const handleChangePage = (pageNumber) => setCurrentPage(pageNumber)

  return {
    faqs,
    currentFaqs,
    addPopUp,
    handleToggleAddPopUp,
    handleInput,
    handleAddFaq,
    editPopUp,
    handleToggleEditPopUp,
    updateFaqData,
    handleEditInput,
    handleUpdateFaq,
    handleDeleteFaq,
    faqsPerPage,
    currentPage,
    handleChangePage,
  }
}
