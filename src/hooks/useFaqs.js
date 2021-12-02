import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { getAllFaqs, deleteFaq } from '../WebAPI'

export default function useFaqs() {
  const [faqs, setFaqs] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const faqsPerPage = 5
  const [addPopUp, setAddPopUp] = useState(false)
  const [editPopUp, setEditPopUp] = useState(false)
  const [editedFaq, setEditedFaq] = useState()

  useEffect(() => {
    const fetchFaqs = async () => {
      const res = await getAllFaqs
      setFaqs(res.data.allQAs)
    }

    fetchFaqs()
  }, [])

  // Get current faqs
  const indexOfLastFaq = currentPage * faqsPerPage
  const indexOfFirstFaq = indexOfLastFaq - faqsPerPage
  const currentFaqs = faqs.slice(indexOfFirstFaq, indexOfLastFaq)

  const handleToggleAddPopUp = () => {
    setAddPopUp(!addPopUp)
  }

  const handleToggleEditPopUp = (id, question, answer) => {
    setEditPopUp(!editPopUp)
    setEditedFaq({ id, question, answer })
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
        deleteFaq(id)
          .then((res) => {
            if (res.data.message === 'success') {
              setFaqs(faqs.filter((faq) => faq.id !== id))
              Swal.fire({
                icon: 'success',
                title: '刪除成功',
                showConfirmButton: false,
                timer: 1500,
              })
            }
          })
          .catch((err) => {
            console.log(err)
            Swal.fire('發生錯誤！')
          })
      }
    })
  }

  const handleChangePage = (pageNumber) => setCurrentPage(pageNumber)

  return {
    faqs,
    setFaqs,
    currentFaqs,
    addPopUp,
    handleToggleAddPopUp,
    editPopUp,
    editedFaq,
    handleToggleEditPopUp,
    handleDeleteFaq,
    faqsPerPage,
    currentPage,
    handleChangePage,
  }
}
