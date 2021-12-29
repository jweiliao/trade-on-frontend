import { useState, useEffect, useContext, useRef } from 'react'
import { useHistory } from 'react-router'
import { useLocation } from 'react-router-dom'
import AuthContext from '../contexts'
import { getUser, getUserRecord } from '../WebAPI'

export default function useUserRecord() {
  const history = useHistory()
  const location = useLocation()
  const userId = location.pathname.slice(11)
  const { user } = useContext(AuthContext)
  const [userData, setUserData] = useState()

  const [give, take] = ['贈物', '索物']
  const [behaviorFilter, setBehaviorFilter] = useState(give)

  const all = '全部'
  const isCompleted = '已完成'
  const statusData = [all, isCompleted]
  const [statusFilter, setStatusFilter] = useState(all)

  const [giveAllRecord, setGiveAllRecord] = useState([])
  const [giveCompleteRecord, setGiveCompleteRecord] = useState([])
  const [takeAllRecord, setTakeAllRecord] = useState([])
  const [takeCompleteRecord, setTakeCompleteRecord] = useState([])
  const [records, setRecords] = useState([])

  const [currentPage, setCurrentPage] = useState(1)
  const [currentRecords, setCurrentRecords] = useState([])
  const recordsPerPage = 24

  const scrollRef = useRef(null)
  const scrollToTop = () => scrollRef.current.scrollIntoView()

  useEffect(() => {
    const fetchUserAndRecords = async (id) => {
      try {
        const {
          data: { userInfo },
        } = await getUser(id)
        setUserData(userInfo)
        fetchGiveAllRecords(id)
        fetchGiveCompleteRecords(id)
        fetchTakeAllRecords(id)
        fetchTakeCompleteRecords(id)
      } catch (err) {
        history.push('/')
        return
      }
    }

    const fetchGiveAllRecords = async (id) => {
      const { data } = await getUserRecord(id, 1000, 'give', 'all')
      setGiveAllRecord(data.allRelatedPosts)
    }

    const fetchGiveCompleteRecords = async (id) => {
      const { data } = await getUserRecord(id, 1000, 'give', 'complete')
      setGiveCompleteRecord(data.allRelatedPosts)
    }

    const fetchTakeAllRecords = async (id) => {
      const { data } = await getUserRecord(id, 1000, 'take', 'all')
      setTakeAllRecord(data.allRelatedPosts)
    }

    const fetchTakeCompleteRecords = async (id) => {
      const { data } = await getUserRecord(id, 1000, 'take', 'complete')
      setTakeCompleteRecord(data.allRelatedPosts)
    }

    if (userId) {
      fetchUserAndRecords(userId)
    } else {
      if (!user) {
        history.push('/')
        return
      }
      fetchUserAndRecords(user.id)
    }
  }, [userId, user, history])

  useEffect(() => {
    setCurrentPage(1)
    if (behaviorFilter === give && statusFilter === all) {
      setRecords(giveAllRecord)
      return
    }
    if (behaviorFilter === give && statusFilter === isCompleted) {
      setRecords(giveCompleteRecord)
      return
    }
    if (behaviorFilter === take && statusFilter === all) {
      setRecords(takeAllRecord)
      return
    }
    if (behaviorFilter === take && statusFilter === isCompleted) {
      setRecords(takeCompleteRecord)
      return
    }
  }, [
    behaviorFilter,
    statusFilter,
    giveAllRecord,
    giveCompleteRecord,
    takeAllRecord,
    takeCompleteRecord,
  ])

  useEffect(() => {
    const indexOfLastRecord = currentPage * recordsPerPage
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
    setCurrentRecords(records.slice(indexOfFirstRecord, indexOfLastRecord))
  }, [currentPage, records])

  const handleChangePage = (pageNumber) => {
    setCurrentPage(pageNumber)
    scrollToTop()
  }

  const handleChangeStatus = (status) => {
    setStatusFilter(status)
  }

  const handleChangeBehavior = (behavior) => {
    if (behavior === give) {
      setBehaviorFilter(give)
      return
    }
    setBehaviorFilter(take)
  }

  return {
    scrollRef,
    userData,
    behaviorFilter,
    handleChangeBehavior,
    statusData,
    statusFilter,
    handleChangeStatus,
    records,
    currentRecords,
    recordsPerPage,
    handleChangePage,
    currentPage,
  }
}
