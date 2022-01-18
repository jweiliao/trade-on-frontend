import { useState, useEffect, useContext, useRef } from 'react'
import { useHistory } from 'react-router'
import { useParams } from 'react-router-dom'
import AuthContext from '../contexts'
import { getUser, getUserRecord } from '../WebAPI'

export default function useUserRecord() {
  const history = useHistory()
  const { id: userId } = useParams()
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
      const {
        data: { allRelatedPosts },
      } = await getUserRecord(id, 1000, 'give', 'all')
      if (allRelatedPosts) setGiveAllRecord(allRelatedPosts)
    }

    const fetchGiveCompleteRecords = async (id) => {
      const {
        data: { allRelatedPosts },
      } = await getUserRecord(id, 1000, 'give', 'complete')
      if (allRelatedPosts) setGiveCompleteRecord(allRelatedPosts)
    }

    const fetchTakeAllRecords = async (id) => {
      const {
        data: { allRelatedPosts },
      } = await getUserRecord(id, 1000, 'take', 'all')
      if (allRelatedPosts) setTakeAllRecord(allRelatedPosts)
    }

    const fetchTakeCompleteRecords = async (id) => {
      const {
        data: { allRelatedPosts },
      } = await getUserRecord(id, 1000, 'take', 'complete')
      if (allRelatedPosts) setTakeCompleteRecord(allRelatedPosts)
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
    give,
    take,
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
