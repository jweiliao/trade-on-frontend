import { useState, useEffect, useRef } from 'react'
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

  const [editedCategory, setEditedCategory] = useState()

  //  儲存 input 欄中輸入的值
  const categoryCotentRef = useRef()
  const [newCategory, setNewCategory] = useState({
    categoryName: '',
  })
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

  // const handleToggleEditPopUp = (id, content) => {
  //   // setEditPopUp(!editPopUp)
  //   setEditedCategory({ id, content })
  // }

  const handleNewCategory = (e) => {
    setNewCategory({
      categoryName: e.target.value,
    })
  }
  // 當點擊 "新增" 按鈕時，執行 handleAddCategory
  const handleAddCategory = (e) => {
    e.preventDefault()

    // 如果 input  為空，不進行任何動作
    if (categoryCotentRef.current.value === '') return

    try {
      addCategory(newCategory).then((res) => {
        console.log(res.data)
        const newCategory = res.data.new
        if (res.data.message === 'success') {
          Swal.fire({
            icon: 'success',
            title: '新增成功',
            showConfirmButton: false,
            timer: 1500,
          })
          setCategories([
            {
              id: newCategory.id,
              categoryName: newCategory.categoryName,
              createdAt: newCategory.createdAt,
              lastModified: newCategory.lastModified,
            },
            ...categories,
          ])
        }
      })
    } catch (err) {
      console.log(err)
      Swal.fire('請稍候再試一次!', 'error')
    }
    // 然後將 input 欄位清空
    setNewCategory({
      categoryName: '',
    })
  }

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
    handleNewCategory,
    handleAddCategory,
    categoryCotentRef,
    newCategory,
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
