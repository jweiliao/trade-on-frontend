import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { getAllPosts, deletePost, PostPublishStatus } from '../WebAPI'

export default function usePosts() {
  const [posts, setPosts] = useState([])
  const [currentPostsPage, setCurrentPostsPage] = useState(1)
  const postsPerPage = 5
  // const [editedpost, setEditedPost] = useState()

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await getAllPosts(100)
      setPosts(res.data.allPosts)
    }

    fetchPosts()
  }, [])

  // Get current Posts
  const indexOfLastPost = currentPostsPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  // const handleToggleAddPopUp = () => {
  //   setAddPopUp(!addPopUp)
  // }

  // const handleToggleEditPopUp = (id, question, answer) => {
  //   setEditPopUp(!editPopUp)
  //   setEditedFaq({ id, question, answer })
  // }

  const handleDeletePost = (id) => {
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
        deletePost(id)
          .then((res) => {
            if (res.data.message === 'success') {
              setPosts(posts.filter((post) => post.id !== id))
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

  const handleChangePostPage = (pageNumber) => setCurrentPostsPage(pageNumber)

  return {
    posts,
    setPosts,
    currentPosts,
    handleDeletePost,
    postsPerPage,
    handleChangePostPage,
  }
}
