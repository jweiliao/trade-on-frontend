import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { getAllPosts, updatePostStatus } from '../WebAPI'

export default function usePosts() {
  const [posts, setPosts] = useState([])
  const [currentPostsPage, setCurrentPostsPage] = useState(1)
  const [togglePublicStatus, setTogglePublicStatus] = useState(true)
  const WordLimit = 50
  const postsPerPage = 15

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await getAllPosts(100)
      setPosts(res.data.allPosts)
    }

    fetchPosts()
  }, [currentPostsPage, togglePublicStatus])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPostsPage])

  // Get current Posts
  const indexOfLastPost = currentPostsPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  const handleToggleIsPublic = (id, isPublic) => {
    if (isPublic) {
      Swal.fire({
        icon: 'warning',
        title: '下架',
        text: '確定要下架嗎？',
        showCancelButton: true,
        confirmButtonColor: '#e25151',
        cancelButtonColor: '#B7B7B7',
        cancelButtonText: '不，取消下架',
        confirmButtonText: '是的，我要下架',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          updatePostStatus(id).then((res) => {
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
        }
      })
    } else {
      Swal.fire({
        icon: 'question',
        title: '上架',
        text: '確定要上架嗎？',
        showCancelButton: true,
        confirmButtonColor: '#bae8e8',
        cancelButtonColor: '#B7B7B7',
        cancelButtonText: '不，取消上架',
        confirmButtonText: '是的，我要上架',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          updatePostStatus(id).then((res) => {
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
        }
      })
    }
  }

  const handleChangePostPage = (pageNumber) => setCurrentPostsPage(pageNumber)

  return {
    posts,
    currentPosts,
    WordLimit,
    postsPerPage,
    handleToggleIsPublic,
    currentPostsPage,
    handleChangePostPage,
  }
}
