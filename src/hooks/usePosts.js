import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { getAllPosts, PostPublishStatus } from '../WebAPI'

export default function usePosts() {
  const [posts, setPosts] = useState([])
  const [currentPostsPage, setCurrentPostsPage] = useState(1)
  const [togglePublicStatus, setTogglePublicStatus] = useState(true)

  const postsPerPage = 5

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await getAllPosts(100)
      setPosts(res.data.allPosts)
    }

    fetchPosts()
  }, [currentPostsPage, togglePublicStatus])

  // Get current Posts
  const indexOfLastPost = currentPostsPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  const handleToggleIsPublic = (id, isPublic) => {
    if (isPublic === true) {
      try {
        Swal.fire({
          title: '下架贈物文',
          text: '確定要下架嗎？',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#e25151',
          cancelButtonColor: '#B7B7B7',
          cancelButtonText: '不，取消下架',
          confirmButtonText: '是的，我要下架',
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            PostPublishStatus(id).then((res) => {
              // console.log(res.data.update)
              // console.log(res.data.update.isPublic)
              const updatedStatus = res.data.update
              if (res.data.message === 'success') {
                setTogglePublicStatus(!togglePublicStatus)
                setPosts(
                  posts.map((post) => {
                    if (post.id !== updatedStatus.id) return post
                    return {
                      ...post,
                      isPublic: updatedStatus.isPublic,
                    }
                  })
                )
              }
            })
            Swal.fire({
              title: '下架成功',
              text: '已將此筆贈物文下架',
              icon: 'success',
              confirmButtonColor: '#bae8e8',
              confirmButtonText: '完成',
            })
          }
        })
      } catch (err) {
        console.log(err.response)
        Swal.fire('請稍候再試一次!', 'error')
      }
    } else {
      try {
        Swal.fire({
          title: '上架贈物文',
          text: '確定要上架嗎？',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#e25151',
          cancelButtonColor: '#B7B7B7',
          cancelButtonText: '不，取消上架',
          confirmButtonText: '是的，我要上架',
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            PostPublishStatus(id).then((res) => {
              // console.log(res.data.update)
              // console.log(res.data.update.isPublic)
              const updatedStatus = res.data.update
              if (res.data.message === 'success') {
                setTogglePublicStatus(!togglePublicStatus)
                setPosts(
                  posts.map((post) => {
                    if (post.id !== updatedStatus.id) return post
                    return {
                      ...post,
                      isPublic: updatedStatus.isPublic,
                    }
                  })
                )
              }
            })
            Swal.fire({
              title: '上架成功',
              text: '已將此筆贈物文上架',
              icon: 'success',
              confirmButtonColor: '#bae8e8',
              confirmButtonText: '完成',
            })
          }
        })
      } catch (err) {
        console.log(err.response)
        Swal.fire('請稍候再試一次!', 'error')
      }
    }
  }

  const handleChangePostPage = (pageNumber) => setCurrentPostsPage(pageNumber)

  return {
    posts,
    setPosts,
    currentPosts,
    postsPerPage,
    handleToggleIsPublic,
    currentPostsPage,
    handleChangePostPage,
  }
}
