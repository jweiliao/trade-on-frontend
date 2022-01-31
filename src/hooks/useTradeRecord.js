import { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router'
import { useParams } from 'react-router-dom'
import AuthContext, { LoadingContext } from '../contexts'
import {
  getTransaction,
  cancelTransaction,
  updateShippingInfo,
  checkTransactionPayment,
  checkTransactionComplete,
} from '../WebAPI'
import Swal from 'sweetalert2'
import dealStatus from '../constants/dealStatus'

export default function useTradeRecord() {
  const history = useHistory()
  const { id: tradeRecordId } = useParams()
  const { user } = useContext(AuthContext)
  const { setIsLoading } = useContext(LoadingContext)
  const [isGiver, setIsGiver] = useState(null)
  const [tradeRecord, setTradeRecord] = useState([])
  const [otherUser, setOtherUser] = useState({})

  const [status, setStatus] = useState('')
  const { toFillInfo, toCharge, delivering, isCompleted, isCanceled } =
    dealStatus

  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    cellPhone: '',
    storeCode: '',
    storeName: '',
  })
  const [errorMessages, setErrorMessages] = useState({})

  useEffect(() => {
    const fetchTradeRecord = async () => {
      const {
        data: { dealInfo },
      } = await getTransaction(tradeRecordId)
      setTradeRecord(dealInfo)
      return dealInfo
    }

    const setRole = (dealInfo) => {
      if (user.id === (dealInfo.owner && dealInfo.owner._id)) {
        setOtherUser(dealInfo.dealer)
        setIsGiver(true)
      } else if (user.id === (dealInfo.dealer && dealInfo.dealer._id)) {
        setOtherUser(dealInfo.owner)
        setIsGiver(false)
      } else {
        history.push('/')
        return
      }
    }

    fetchTradeRecord().then((dealInfo) => {
      setRole(dealInfo)
    })
  }, [history, tradeRecordId, user.id])

  useEffect(() => {
    const setDealStatus = () => {
      if (tradeRecord.length === 0) return
      if (tradeRecord.isCanceled) {
        setStatus(isCanceled)
        return
      }
      if (tradeRecord.isCompleted) {
        setStatus(isCompleted)
        return
      }
      if (tradeRecord.isPaid) {
        setStatus(delivering)
        return
      }
      if (tradeRecord.isFilled) {
        setStatus(toCharge)
        return
      }
      if (!tradeRecord.isFilled) {
        setStatus(toFillInfo)
        return
      }
    }

    setDealStatus()
  }, [delivering, isCanceled, isCompleted, toCharge, toFillInfo, tradeRecord])

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
            setTradeRecord({
              ...tradeRecord,
              isCanceled: true,
            })
          }
        })
      }
    })
  }

  const handleChange = (e) => {
    const value = e.target.value
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: value,
    })
    setErrorMessages({
      ...errorMessages,
      [e.target.name]: '',
    })
  }

  const validateShippingInfo = (values) => {
    let errors = {}

    if (!values.name.trim()) {
      errors.name = '此欄位為必填'
    }

    if (!values.cellPhone) {
      errors.cellPhone = '此欄位為必填'
    } else if (!/^09\d{8}$/.test(values.cellPhone)) {
      errors.cellPhone = '手機格式不正確'
    }

    if (!values.storeCode) {
      errors.storeCode = '此欄位為必填'
    } else if (!/^\d{5,6}$/.test(values.storeCode)) {
      errors.storeCode = '店號格式不正確'
    }

    if (!values.storeName.trim()) {
      errors.storeName = '此欄位為必填'
    }

    return errors
  }

  const handelUpdateStatus = (id) => {
    switch (status) {
      case toFillInfo:
        if (Object.keys(validateShippingInfo(shippingInfo)).length !== 0) {
          setErrorMessages(validateShippingInfo(shippingInfo))
          return
        }
        setIsLoading(true)
        updateShippingInfo(tradeRecordId, shippingInfo).then((res) => {
          if (res.data.message === 'success') {
            setTradeRecord(res.data.updated)
          }
          setIsLoading(false)
        })
        break

      case toCharge:
        setIsLoading(true)
        checkTransactionPayment(id).then((res) => {
          if (res.data.message === 'success') {
            setTradeRecord({
              ...tradeRecord,
              isPaid: true,
            })
          }
          setIsLoading(false)
        })
        break

      case delivering:
        setIsLoading(true)
        checkTransactionComplete(id).then((res) => {
          if (res.data.message === 'success') {
            setTradeRecord({
              ...tradeRecord,
              isCompleted: true,
            })
          }
          setIsLoading(false)
        })
        break

      default:
        break
    }
  }

  return {
    isGiver,
    status,
    otherUser,
    tradeRecord,
    errorMessages,
    shippingInfo,
    handleCancelDeal,
    handleChange,
    handelUpdateStatus,
  }
}
