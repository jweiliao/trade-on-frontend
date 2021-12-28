import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { getAllFaqs, deleteFaq } from '../WebAPI'

export default function useGiveItem() {
  const [faqs, setFaqs] = useState([])

  const [givePopUp, setGivePopUp] = useState(false)
  const [editPopUp, setEditPopUp] = useState(false)
  const [editedFaq, setEditedFaq] = useState()
  const [applyMsgId, setApplyMsgId] = useState({})

  // useEffect(() => {
  //   const fetchFaqs = async () => {
  //     const res = await getAllFaqs
  //     setFaqs(res.data.allQAs)
  //   }

  //   fetchFaqs()
  // }, [])

  const handleToggleGivePopUp = (msgId) => {
    setGivePopUp(!givePopUp)
    setApplyMsgId(msgId)
  }

  // const handleToggleEditPopUp = (id, question, answer) => {
  //   setEditPopUp(!editPopUp)
  //   setEditedFaq({ id, question, answer })
  // }

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

  console.log('apply', applyMsgId)

  return {
    faqs,
    setFaqs,
    givePopUp,
    handleToggleGivePopUp,
    editPopUp,
    editedFaq,
    handleDeleteFaq,
    applyMsgId,
  }
}
