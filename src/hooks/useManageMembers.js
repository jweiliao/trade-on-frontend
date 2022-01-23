import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { getAllUsers, updateUserAuthority } from '../WebAPI'

export default function useManageMembers() {
  const [members, setMembers] = useState([])
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateAuthorityData, setUpdateAuthorityData] = useState({
    role: null,
    isAllowPost: null,
    isAllowMessage: null,
  })
  const [currentManageMembersPage, setCurrentManageMembersPage] = useState(1)
  const membersPerPage = 20

  // 撈取所有 member 的資料,更新到 members 的 state 中
  useEffect(() => {
    const fetchMembers = async () => {
      const res = await getAllUsers(100)
      setMembers(res.data.allUsers)
    }

    fetchMembers()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentManageMembersPage])

  // Get current Categories
  const indexOfLastMembers = currentManageMembersPage * membersPerPage
  const indexOfFirstMembers = indexOfLastMembers - membersPerPage
  const currentMembers = members.slice(indexOfFirstMembers, indexOfLastMembers)

  // 點擊 "編輯權限" 後，將該會員資料更新到 UpdateAuthorityData 的 state
  const handleChangeMemberData = (id) => {
    const memberData = members.filter((member) => {
      return member.id === id
    })

    setUpdateAuthorityData({
      role: memberData[0].accountAuthority,
      isAllowPost: memberData[0].isAllowPost,
      isAllowMessage: memberData[0].isAllowMessage,
    })
  }

  // select 會員身份，偵測到 onchange 時執行
  const handleChangeAccountAuthority = (e) => {
    const selected = e.target.value
    const id = e.target.id

    //  將選擇的身份更新該會員到 UpdateAuthorityData 的 state
    setUpdateAuthorityData({
      ...updateAuthorityData,
      role: selected,
    })

    //  將選擇的身份更新該會員到 member 的 state
    setMembers(
      members.map((member) => {
        if (member.id !== id) return member
        return {
          ...member,
          accountAuthority: selected,
        }
      })
    )
  }

  // 會員的發文與留言權限，偵測到 onchange 時執行
  const handleChangeAllow = (e) => {
    const key = e.target.value
    const isChecked = e.target.checked

    //  將 checked 的狀態更新該會員到 UpdateAuthorityData 的 state
    setUpdateAuthorityData({
      ...updateAuthorityData,
      [key]: isChecked,
    })
  }

  // 當點擊 "儲存" 按鈕時，執行 handleChangeMember
  const handleChangeMember = (id) => {
    const memberId = id

    // 串接 updateUserAuthority API 更新權限
    updateUserAuthority(memberId, updateAuthorityData).then((res) => {
      if (res.data.message === 'success') {
        Swal.fire({
          icon: 'success',
          title: '更新成功',
          showConfirmButton: false,
          timer: 1500,
        })
        setIsUpdating(false)
      }
    })
  }

  const handleChangeManageMembersPage = (pageNumber) =>
    setCurrentManageMembersPage(pageNumber)

  return {
    members,
    currentMembers,
    currentManageMembersPage,
    membersPerPage,
    handleChangeManageMembersPage,
    handleChangeAccountAuthority,
    handleChangeAllow,
    handleChangeMember,
    isUpdating,
    setIsUpdating,
    handleChangeMemberData,
  }
}
