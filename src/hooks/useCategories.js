import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from '../WebAPI'

export default function useCategories() {
  const [categories, setCategories] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const categoriesPerPage = 5
  // const [addPopUp, setAddPopUp] = useState(false)
  // const [editPopUp, setEditPopUp] = useState(false)
  const [editedCategory, setEditedCategory] = useState()

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getAllCategories(100)
      setCategories(res.data.categories)
    }

    fetchCategories()
  }, [])

  // Get current faqs
  const indexOfLastFaq = currentPage * categoriesPerPage
  const indexOfFirstFaq = indexOfLastFaq - categoriesPerPage
  const currentCategories = categories.slice(indexOfFirstFaq, indexOfLastFaq)

  // const handleToggleAddPopUp = () => {
  //   setAddPopUp(!addPopUp)
  // }

  // const [newFaqData, setNewFaqData] = useState({
  //   question: '',
  //   answer: '',
  // })

  // const handleAddFaq = (e) => {
  //   e.preventDefault()
  //   addCategory(newFaqData)
  //     .then((res) => {
  //       const newFaq = res.data.new
  //       console.log(res.data)
  //       if (res.data.message === 'success') {
  //         Swal.fire({
  //           icon: 'success',
  //           title: '新增成功',
  //           showConfirmButton: false,
  //           timer: 1500,
  //         })
  //         setCategories([
  //           {
  //             categoryName: newFaq.question,
  //           },
  //           ...categories,
  //         ])
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       Swal.fire('發生錯誤！')
  //     })
  //   handleToggleAddPopUp()
  // }

  // const handleToggleEditPopUp = (id, content) => {
  //   // setEditPopUp(!editPopUp)
  //   setEditedCategory({ id, content })
  // }

  const handleDeleteCategory = (id) => {
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
        deleteCategory(id)
          .then((res) => {
            if (res.data.message === 'success') {
              setCategories(categories.filter((category) => category.id !== id))
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

  // const handleChangePage = (pageNumber) => setCurrentPage(pageNumber)

  return {
    categories,
    setCategories,
    // currentCategories,
    // addPopUp,
    // handleToggleAddPopUp,
    // editPopUp,
    // editedCategory,
    // handleToggleEditPopUp,
    handleDeleteCategory,
    // categoriesPerPage,
    // handleChangePage,
  }
}
