import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import Container from '../../components/Container'
import { SmallButton, LargeButton } from '../../components/buttons'
import { SubTitle } from '../../components/heading'
import { MEDIA_QUERY_SM } from '../../styles/breakpoints'
import UpdatePortfolioPw from '../../components/UpdatePortfolioPw'
import AvatarUploader from '../../components/AvatarUploader'
import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../components/FormikControl'
import AuthContext from '../../contexts'

const BorderWrapper = styled(Form)`
  border: ${(props) => props.theme.general_300} solid 1px;
  padding: 3rem 5%;
  margin: 3rem;
  ${MEDIA_QUERY_SM} {
    margin: 0rem;
  }
`

const PersonalInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3.125rem;
`

const AvatarWrapper = styled.div`
  width: 8rem;
  height: 8rem;
  position: relative;
  margin-bottom: 1rem;
  border-radius: 50%;
  overflow: hidden;
`

const Avatar = styled.img`
  max-height: 100%;
  max-width: 100%;
  width: auto;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`

const UploadAvatarBtn = styled(SmallButton)`
  position: absolute;
  bottom: 0;
  width: 100%;
  opacity: 0.9;
  padding: 0.5rem;
  height: 1.5rem;
`

const Email = styled.p`
  font-size: 1.25rem;
  line-height: 1.5;
  text-align: center;
  max-width: 34rem;
  white-space: nowrap;
  overflow: auto;
  margin: 0.8rem 0;
  ${MEDIA_QUERY_SM} {
    width: 100%;
  }
`

const EditPasswordBtn = styled(SmallButton)`
  padding: 0;
  width: 4.5rem;
  height: 1.8rem;
`
const BasicInfo = styled.div`
  margin-bottom: 3.125rem;
`

const BasicInfoTitle = styled(SubTitle)`
  margin-bottom: 2rem;
`

const Name = styled.div`
  width: 20rem;
  ${MEDIA_QUERY_SM} {
    width: 100%;
  }
`

const Introduction = styled(Name)`
  width: 27rem;
  ${MEDIA_QUERY_SM} {
    width: 100%;
  }
`

const TransactionType = styled(BasicInfo)``

const TransactionTypeTitle = styled(BasicInfoTitle)``

const Trading = styled(Name)`
  margin-bottom: 0.8rem;
`

const Region = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1.8rem;
  select {
    margin: 0.4rem 0;
    width: 9rem;
    height: 1.9rem;
  }
`

const District = styled(Region)`
  input {
    margin: 0.4rem 0;
    width: 9rem;
    height: 1.9rem;
  }
`

const TransferInfo = styled(BasicInfo)``

const TransferInfoTitle = styled(BasicInfoTitle)``

const Note = styled.span`
  font-size: 1rem;
`

const BankCode = styled(Name)``

const BankAccount = styled(Name)``

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  ${MEDIA_QUERY_SM} {
    flex-direction: column-reverse;
  }
`
const UpdateButton = styled(LargeButton)`
  margin: 0 2rem;
  ${MEDIA_QUERY_SM} {
    margin: 0.8rem auto;
    max-width: 16rem;
    width: 100%;
  }
`

const CancelButton = styled(UpdateButton)`
  background: ${(props) => props.theme.general_200};
  &:hover {
    background: ${(props) => props.theme.general_300};
  }
`

export default function EditPortfolioPage() {
  const {
    user: { account, avatarUrl, email, nickname },
  } = useContext(AuthContext)

  const { user } = useContext(AuthContext)
  console.log(user)
  console.log(account)
  const tradingOptions = [
    { key: '7-11 店到店', value: '7-11 店到店' },
    { key: '全家店到店', value: '全家店到店' },
    { key: '面交', value: '面交' },
  ]

  const regionOptions = [{ key: '基隆市', value: '基隆市' }]

  const initialValues = {
    name: nickname || '',
    introduction: '',
    trading: [],
    region: '',
    district: '',
    bankCode: '',
    bankAccount: '',
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('此欄位為必填'),
    introduction: Yup.string().max(100, '限 100 字'),
    trading: Yup.array(),
    region: Yup.string().when('trading', (trading, schema) => {
      try {
        if (trading.includes('面交')) {
          return Yup.string().required('請選擇面交縣市')
        }
        return schema
      } catch (error) {
        console.log('error', error)
      }
    }),
    district: Yup.string().when('trading', (trading, schema) => {
      try {
        if (trading.includes('面交')) {
          return Yup.string().required('請填寫面交地點')
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
    bankAccount: Yup.string()
      .matches(/^[0-9]+$/, '請填寫數字')
      .min(10, '格式錯誤')
      .max(14, '格式錯誤'),
  })

  const handleSubmit = (values) => {
    console.log(values)
  }

  // 設定是否顯示更新密碼彈窗的 state，預設 false（不顯示彈窗）
  const [pwPopUp, setPwPopUp] = useState(false)

  const [AvPopUp, AvPwPopUp] = useState(false)

  // 當點擊 "更改密碼" 的按鈕時，執行 handleEditPwClick
  // => 更新 pwPopUp 的 state 為 true （顯示彈窗）
  const handleEditPwClick = () => {
    setPwPopUp(true)
  }

  // closeModal => 更新 pwPopUp 的 state 為 false （不顯示彈窗）
  const closeModal = () => {
    setPwPopUp(false)
  }

  const handleAvatar = () => {
    AvPwPopUp(true)
  }

  const AvCloseModal = () => {
    AvPwPopUp(false)
  }

  return (
    <Container>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <BorderWrapper>
            <PersonalInfo>
              <AvatarWrapper>
                <Avatar src={`${avatarUrl}` || null} />
                <UploadAvatarBtn type="button" onClick={handleAvatar}>
                  編輯
                </UploadAvatarBtn>
                {AvPopUp && (
                  <AvatarUploader
                    AvPwPopUp={AvPwPopUp}
                    closeModal={AvCloseModal}
                  />
                )}
              </AvatarWrapper>
              <Email>{email || null}</Email>
              {/* 點擊 "更改密碼" 的按鈕時，執行 handleEditPwClick */}
              <EditPasswordBtn type="button" onClick={handleEditPwClick}>
                更改密碼
              </EditPasswordBtn>

              {/* 如果 pwPopUp 的 state 為 true，則顯示設定新密碼的彈窗 */}
              {/* 並且將 setPwPopUp、closeModal 當作 props 帶到彈窗的 component，以便彈窗執行操作時，同時更改 pwPopUp 的狀態 */}
              {pwPopUp && (
                <UpdatePortfolioPw
                  setPwPopUp={setPwPopUp}
                  closeModal={closeModal}
                />
              )}
            </PersonalInfo>
            <BasicInfo>
              <BasicInfoTitle>基本資料</BasicInfoTitle>
              <Name>
                <FormikControl
                  control="input"
                  label="暱稱"
                  name="name"
                  placeholder="輸入暱稱"
                />
              </Name>
              <Introduction>
                <FormikControl
                  control="textarea"
                  label="自我介紹"
                  name="introduction"
                  placeholder="輸入自我介紹（限 100 字）"
                />
              </Introduction>
            </BasicInfo>
            <TransactionType>
              <TransactionTypeTitle>偏好交易方式</TransactionTypeTitle>
              <Trading>
                <FormikControl
                  control="checkbox"
                  name="trading"
                  options={tradingOptions}
                />
                {true && (
                  <>
                    <Region>
                      <FormikControl
                        control="select"
                        label="縣市"
                        name="region"
                        options={regionOptions}
                      />
                    </Region>
                    <District>
                      <FormikControl
                        control="input"
                        label="地點"
                        name="district"
                        placeholder="輸入地點"
                      />
                    </District>
                  </>
                )}
              </Trading>
            </TransactionType>
            <TransferInfo>
              <TransferInfoTitle>
                匯款資訊<Note>（僅在交易中顯示）</Note>
              </TransferInfoTitle>
              <BankCode>
                <FormikControl
                  control="input"
                  label="銀行代碼"
                  name="bankCode"
                  placeholder="輸入銀行代碼"
                />
              </BankCode>
              <BankAccount>
                <FormikControl
                  control="input"
                  label="帳號"
                  name="bankAccount"
                  placeholder="輸入銀行名稱"
                />
              </BankAccount>
            </TransferInfo>
            <ButtonsWrapper>
              <CancelButton as={Link} to={'/portfolio'}>
                取消
              </CancelButton>
              <UpdateButton type="submit">提交</UpdateButton>
            </ButtonsWrapper>
          </BorderWrapper>
        )}
      </Formik>
    </Container>
  )
}
