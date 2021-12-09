import { useState, useEffect, useContext } from 'react'
import AuthContext from '../contexts'
import { getAllTransactions, cancelTransaction } from '../WebAPI'
import Swal from 'sweetalert2'

export default function useTransactions() {
  const { user } = useContext(AuthContext)
  const [transactions, setTransactions] = useState([])

  const [behaviorFilter, setBehaviorFilter] = useState('give')
  const [statusFilter, setStatusFilter] = useState('toBeFilled')
  const [filterTransactions, setFilterTransactions] = useState([])

  const transactionsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const [currentTransactions, setCurrentTransactions] = useState([])

  useEffect(() => {
    fetchTransactions()
  }, [])

  useEffect(() => {
    let filterResult = filterByBehavior(transactions)
    filterResult = filterByStatus(filterResult)
    setFilterTransactions(filterResult)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [behaviorFilter, statusFilter, transactions])

  useEffect(() => {
    const indexOfLastTransaction = currentPage * transactionsPerPage
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage
    setCurrentTransactions(
      filterTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction)
    )
  }, [currentPage, filterTransactions])

  const fetchTransactions = async () => {
    const { data } = await getAllTransactions(1000)
    if (data.message === 'No deal submitted yet.') return
    setTransactions(data.allTransactions)
  }

  const filterByBehavior = (transactionsData) => {
    if (transactionsData.length === 0) return []
    if (behaviorFilter === 'give') {
      return transactionsData.filter(
        (transaction) => transaction.owner._id === user._id
      )
    }
    return transactionsData.filter(
      (transaction) => transaction.dealer._id === user._id
    )
  }

  const filterByStatus = (transactionsData) => {
    if (transactionsData.length === 0) return []
    switch (statusFilter) {
      case 'toBeFilled':
        return transactionsData.filter(
          (transaction) =>
            transaction.isFilled === false && transaction.isCanceled === false
        )
      case 'toBePaid':
        return transactionsData.filter(
          (transaction) =>
            transaction.isFilled === true &&
            transaction.isPaid === false &&
            transaction.isCanceled === false
        )
      case 'sending':
        return transactionsData.filter(
          (transaction) =>
            transaction.isPaid === true &&
            transaction.isCompleted === false &&
            transaction.isCanceled === false
        )
      case 'isCompleted':
        return transactionsData.filter(
          (transaction) =>
            transaction.isCompleted === true && transaction.isCanceled === false
        )
      case 'isCanceled':
        return transactionsData.filter(
          (transaction) => transaction.isCanceled === true
        )
      default:
        break
    }
  }

  const handleChangeBehaviorTab = (behavior) => {
    if (behavior === 'give') {
      setBehaviorFilter('give')
      return
    }
    setBehaviorFilter('receive')
  }

  const handleChangeStatusTab = (status) => {
    switch (status) {
      case 'toBeFilled':
        setStatusFilter('toBeFilled')
        break
      case 'toBePaid':
        setStatusFilter('toBePaid')
        break
      case 'sending':
        setStatusFilter('sending')
        break
      case 'isCompleted':
        setStatusFilter('isCompleted')
        break
      case 'isCanceled':
        setStatusFilter('isCanceled')
        break
      default:
        break
    }
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
        cancelTransaction(id)
          .then((res) => {
            if (res.data.message === 'success') {
              fetchTransactions()
            }
          })
          .catch((err) => {
            console.log(err)
            Swal.fire('發生錯誤！')
          })
      }
    })
  }

  const handleChangePage = (pageNumber) => setCurrentPage(pageNumber)

  return {
    filterTransactions,
    currentTransactions,
    behaviorFilter,
    handleChangeBehaviorTab,
    statusFilter,
    handleChangeStatusTab,
    handleCancelDeal,
    transactionsPerPage,
    currentPage,
    handleChangePage,
  }
}
