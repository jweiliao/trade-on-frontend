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
  const categoriesPerPage = 5

  //  儲存新增分類的input 欄中輸入的值
  const categoryCotentRef = useRef()
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

  // Get current Categories
  const indexOfLastCategory = currentCategoryPage * categoriesPerPage
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage
  const currentCategories = categories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  )

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
            ...categories,
            {
              id: newCategory.id,
              categoryName: newCategory.categoryName,
              createdAt: newCategory.createdAt,
              lastModified: newCategory.lastModified,
            },
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

  const handleEditMessage = (e) => {
    const categoryId = e.target.id
    console.log(categoryId)
    if (editValue === '') {
      e.preventDefault()
    }
    const editData = {
      categoryName: editValue,
      compareId: categoryId,
    }
    console.log(editData)
    try {
      updateCategory(editData.compareId, editData).then((res) => {
        console.log(res.data)
        const updatedCategory = res.data.update
        if (res.data.message === 'success') {
          //跳出 "更新成功"的彈窗提示
          Swal.fire({
            icon: 'success',
            title: '更新成功',
            showConfirmButton: false,
            timer: 1500,
          })
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
        }
      })
    } catch (err) {
      console.log(err)
      Swal.fire('請稍候再試一次!', 'error')
    }
    setEditValue('')
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

  const handleChangeCategoryPage = (pageNumber) =>
    setCurrentCategoryPage(pageNumber)

  return {
    categories,
    setCategories,
    handleNewCategory,
    handleAddCategory,
    categoryCotentRef,
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
