import { useState, useEffect, useCallback, useContext, useRef } from 'react'
import AuthContext from '../contexts'
import { getAllTransactions, cancelTransaction } from '../WebAPI'
import Swal from 'sweetalert2'
import dealStatus from '../constants/dealStatus'

export default function useTransactions() {
  const {
    user: { id: userId },
  } = useContext(AuthContext)
  const [transactions, setTransactions] = useState([])

  const give = '贈物'
  const [behaviorFilter, setBehaviorFilter] = useState(give)

  const { toFillInfo, toCharge, delivering, isCompleted, isCanceled } =
    dealStatus
  const [statusFilter, setStatusFilter] = useState(toFillInfo)
  const [filterTransactions, setFilterTransactions] = useState([])

  const transactionsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const [currentTransactions, setCurrentTransactions] = useState([])

  const scrollRef = useRef(null)
  const scrollToTop = () => scrollRef.current.scrollIntoView()

  const fetchTransactions = useCallback(() => {
    const fetchingTransactions = async () => {
      const { data } = await getAllTransactions(1000)
      if (data.error) {
        Swal.fire('發生錯誤！')
        return
      }
      if (data.message === 'No deal submitted yet.') return
      setTransactions(data.allTransactions)
    }

    fetchingTransactions()
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  useEffect(() => {
    const filterByBehavior = (transactionsData) => {
      if (transactionsData.length === 0) return []
      if (behaviorFilter === give) {
        return transactionsData.filter(
          (transaction) => transaction.owner._id === userId
        )
      }
      return transactionsData.filter(
        (transaction) => transaction.dealer._id === userId
      )
    }

    const filterByStatus = (transactionsData) => {
      if (transactionsData.length === 0) return []
      switch (statusFilter) {
        case toFillInfo:
          return transactionsData.filter(
            (transaction) => !transaction.isFilled && !transaction.isCanceled
          )
        case toCharge:
          return transactionsData.filter(
            (transaction) =>
              transaction.isFilled &&
              !transaction.isPaid &&
              !transaction.isCanceled
          )
        case delivering:
          return transactionsData.filter(
            (transaction) =>
              transaction.isPaid &&
              !transaction.isCompleted &&
              !transaction.isCanceled
          )
        case isCompleted:
          return transactionsData.filter(
            (transaction) => transaction.isCompleted && !transaction.isCanceled
          )
        case isCanceled:
          return transactionsData.filter(
            (transaction) => transaction.isCanceled
          )
        default:
          break
      }
    }

    let filterResult = filterByBehavior(transactions)
    filterResult = filterByStatus(filterResult)
    setFilterTransactions(filterResult)
  }, [
    behaviorFilter,
    statusFilter,
    transactions,
    toFillInfo,
    toCharge,
    delivering,
    isCompleted,
    isCanceled,
    userId,
  ])

  useEffect(() => {
    const indexOfLastTransaction = currentPage * transactionsPerPage
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage
    setCurrentTransactions(
      filterTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction)
    )
  }, [currentPage, filterTransactions])

  const handleChangeBehavior = (behavior) => {
    setBehaviorFilter(behavior)
  }

  const handleChangeStatus = (status) => {
    setStatusFilter(status)
  }

  const handleCancelDeal = (id) => {
    Swal.fire({
      icon: 'warning',
      title: '取消交易',
      text: '確定要取消交易嗎？',
      showCancelButton: true,
      confirmButtonColor: '#e25151',
      cancelButtonColor: '#B7B7B7',
      cancelButtonText: '繼續交易',
      confirmButtonText: '確定取消',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        cancelTransaction(id).then((res) => {
          if (res.data.message === 'success') {
            fetchTransactions()
          }
        })
      }
    })
  }

  const handleChangePage = (pageNumber) => {
    setCurrentPage(pageNumber)
    scrollToTop()
  }

  return {
    scrollRef,
    filterTransactions,
    currentTransactions,
    give,
    behaviorFilter,
    handleChangeBehavior,
    statusFilter,
    handleChangeStatus,
    handleCancelDeal,
    transactionsPerPage,
    currentPage,
    handleChangePage,
  }
}
