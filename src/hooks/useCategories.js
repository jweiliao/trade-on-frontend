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
  const [currentCategoryPage, setCurrentCategoryPage] = useState(1)
  const categoriesPerPage = 15

  //  儲存新增分類的input 欄中輸入的值
  const categoryContentRef = useRef()
  const [newCategory, setNewCategory] = useState({
    categoryName: '',
  })

  // 儲存是否正在 edit 的狀態
  const [isUpdating, setIsUpdating] = useState(null)
  const [editValue, setEditValue] = useState('')

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getAllCategories()
      setCategories(res.data.categories)
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentCategoryPage])

  // Get current Categories
  const indexOfLastCategory = currentCategoryPage * categoriesPerPage
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage
  const currentCategories = categories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  )

  useEffect(() => {
    if (currentCategories.length === 0) setCurrentCategoryPage(1)
  }, [currentCategories])

  const handleNewCategory = (e) => {
    setNewCategory({
      categoryName: e.target.value,
    })
  }

  const handleAddCategory = (e) => {
    e.preventDefault()

    // 如果 input  為空，不進行任何動作
    if (categoryContentRef.current.value.trim().length === 0) return

    try {
      addCategory(newCategory).then((res) => {
        const newCategory = res.data.new
        if (res.data.message === 'success') {
          setCategories([
            ...categories,
            {
              id: newCategory.id,
              categoryName: newCategory.categoryName,
              createdAt: newCategory.createdAt,
              lastModified: newCategory.lastModified,
            },
          ])
          setCurrentCategoryPage(
            Math.ceil((categories.length + 1) / categoriesPerPage)
          )
          window.scrollTo(0, document.body.scrollHeight)
        }
        if (res.data.message.includes('already exist')) {
          Swal.fire({
            icon: 'error',
            title: '錯誤',
            text: '分類名稱重複',
            showConfirmButton: false,
          })
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

  const handleEditMessage = (e) => {
    const categoryId = e.target.id
    const editData = {
      categoryName: editValue,
      compareId: categoryId,
    }
    updateCategory(editData.compareId, editData).then((res) => {
      const updatedCategory = res.data.update
      if (res.data.message === 'success') {
        setCategories(
          categories.map((category) => {
            if (category.id !== updatedCategory.id) return category
            return {
              ...category,
              categoryName: updatedCategory.categoryName,
            }
          })
        )
        setIsUpdating(false)
        setEditValue('')
      }
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
        deleteCategory(id).then((res) => {
          if (res.data.message === 'success') {
            setCategories(categories.filter((category) => category.id !== id))
          }
        })
      }
    })
  }

  const handleChangeCategoryPage = (pageNumber) =>
    setCurrentCategoryPage(pageNumber)

  return {
    categories,
    setCategories,
    handleNewCategory,
    handleAddCategory,
    categoryContentRef,
    newCategory,
    handleEditMessage,
    isUpdating,
    setIsUpdating,
    editValue,
    setEditValue,
    handleDeleteCategory,
    currentCategories,
    currentCategoryPage,
    categoriesPerPage,
    handleChangeCategoryPage,
  }
}
