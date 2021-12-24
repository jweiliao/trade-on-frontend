import { useState, useEffect, useContext } from 'react'
import { useLocation, useHistory } from 'react-router'
import AuthContext from '../contexts'
import {
  getTransaction,
  cancelTransaction,
  updateShippingInfo,
  checkPayment,
  checkComplete,
} from '../WebAPI'
import Swal from 'sweetalert2'
import dealStatus from '../constants/dealStatus'

export default function useTradeRecord() {
  const location = useLocation()
  const history = useHistory()
  const tradeRecordId = location.pathname.slice(14)

  const { user } = useContext(AuthContext)
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
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      } else {
        setOtherUser(dealInfo.owner)
        setIsGiver(false)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tradeRecord])

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
        setErrorMessages(validateShippingInfo(shippingInfo))
        setIsSubmitting(true)
        break

      case toCharge:
        checkPayment(id).then((res) => {
          if (res.data.message === 'success') {
            setTradeRecord({
              ...tradeRecord,
              isPaid: true,
            })
          }
        })
        break

      case delivering:
        checkComplete(id).then((res) => {
          if (res.data.message === 'success') {
            setTradeRecord({
              ...tradeRecord,
              isCompleted: true,
            })
          }
        })
        break

      default:
        break
    }
  }

  useEffect(() => {
    if (Object.keys(errorMessages).length === 0 && isSubmitting) {
      updateShippingInfo(tradeRecordId, shippingInfo).then((res) => {
        if (res.data.message === 'success') {
          setTradeRecord({
            ...tradeRecord,
            isFilled: true,
            sendingInfo: shippingInfo,
          })
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessages])

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
