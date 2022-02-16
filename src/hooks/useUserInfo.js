import { useState, useContext } from 'react'
import { useHistory } from 'react-router'
import * as Yup from 'yup'
import AuthContext, { LoadingContext } from '../contexts'
import shippingMethod from '../constants/shippingMethod'
import { cities, district } from '../constants/cities'
import { updateUserInfo } from '../WebAPI'

export default function usePost() {
  const history = useHistory()
  const {
    user: { account, nickname, id, introduction, preferDealMethods },
    setUser,
  } = useContext(AuthContext)
  const { setIsLoading } = useContext(LoadingContext)
  const { faceToFace, sevenEleven, familyMart } = shippingMethod
  const shippingOptions = [
    { key: sevenEleven, value: '7-11' },
    { key: familyMart, value: '全家' },
    { key: faceToFace, value: '面交' },
  ]
  const regionOptions = cities
  const [districtOptions, setDistrictOptions] = useState(
    (preferDealMethods &&
      preferDealMethods.faceToFace &&
      [district[preferDealMethods.faceToFace.region]][0]) ||
      []
  )
  const initialValues = {
    nickname: nickname || '',
    introduction: introduction || '',
    tradingOptions:
      (preferDealMethods && preferDealMethods.selectedMethods) || [],
    region:
      (preferDealMethods &&
        preferDealMethods.faceToFace &&
        preferDealMethods.faceToFace.region) ||
      '',
    district:
      (preferDealMethods &&
        preferDealMethods.faceToFace &&
        preferDealMethods.faceToFace.district) ||
      '',
    bankCode: (account && account.bankCode) || '',
    accountNum: (account && account.accountNum) || '',
  }
  const validationSchema = Yup.object({
    nickname: Yup.string().required('此欄位為必填'),
    introduction: Yup.string().max(100, '限 100 字'),
    tradingOptions: Yup.array(),
    region: Yup.string().when('tradingOptions', (tradingOptions, schema) => {
      try {
        if (tradingOptions.includes('面交')) {
          return Yup.string().required('請選擇面交縣市')
        }
        return schema
      } catch (error) {
        console.log('error', error)
      }
    }),
    district: Yup.string().when('tradingOptions', (tradingOptions, schema) => {
      try {
        if (tradingOptions.includes('面交')) {
          return Yup.string().required('請選擇面交鄉鎮(市)區')
        }
        return schema
      } catch (error) {
        console.log('error', error)
      }
    }),
    bankCode: Yup.string()
      .matches(/^[0-9]+$/, '請填寫數字')
      .min(3, '格式錯誤')
      .max(3, '格式錯誤'),
    accountNum: Yup.string()
      .matches(/^[0-9]+$/, '請填寫數字')
      .min(10, '格式錯誤')
      .max(14, '格式錯誤'),
  })
  const [avatarPopUp, setAvatarPopUp] = useState(false)
  const [passwordPopUp, setPasswordPopUp] = useState(false)

  const handleToggleAvatarPopUp = () => {
    setAvatarPopUp(!avatarPopUp)
  }

  const handleTogglePasswordPopUp = () => {
    setPasswordPopUp(!passwordPopUp)
  }

  const handleChange = (e, formik) => {
    const { value } = e.target
    const selectedCityOfDistricts = [district[value]][0]
    setDistrictOptions(selectedCityOfDistricts)
    formik.setFieldValue('region', value)
    formik.setFieldValue('district', selectedCityOfDistricts[0].value)
  }

  const handleSubmit = (data) => {
    setIsLoading(true)
    updateUserInfo(id, data).then((res) => {
      const { data } = res
      if (data.message === 'success') {
        setUser(data.update)
        history.push('/portfolio')
      }
      setIsLoading(false)
    })
  }

  return {
    initialValues,
    validationSchema,
    shippingOptions,
    regionOptions,
    districtOptions,
    avatarPopUp,
    handleToggleAvatarPopUp,
    passwordPopUp,
    handleTogglePasswordPopUp,
    handleChange,
    handleSubmit,
  }
}
