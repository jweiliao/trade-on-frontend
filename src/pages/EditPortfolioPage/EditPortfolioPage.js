import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { MEDIA_QUERY_SM } from '../../styles/breakpoints'
import Container from '../../components/Container'
import { SmallButton, LargeButton } from '../../components/buttons'
import { SubTitle } from '../../components/heading'
import { Img, ImgCircleWrapper } from '../../components/img'
import UpdatePasswordPopUp from '../../components/PopUp/UpdatePasswordPopUp'
import UpdateAvatarPopUp from '../../components/PopUp/UpdateAvatarPopUp'
import { Formik, Form } from 'formik'
import FormikControl from '../../components/FormikControl'
import AuthContext from '../../contexts'
import useUserInfo from '../../hooks/useUserInfo'

const PersonalInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
`

const AvatarWrapper = styled(ImgCircleWrapper)`
  width: 8rem;
  height: 8rem;
  margin-bottom: 1rem;
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
  width: 100%;
`

const EditPasswordBtn = styled(SmallButton)`
  margin-top: 1rem;
`

const BorderWrapper = styled(Form)`
  border: ${(props) => props.theme.general_300} solid 1px;
  padding: 3rem;
  border-radius: 0.25rem;
  ${MEDIA_QUERY_SM} {
    padding: 3rem 2rem;
  }
`

const BasicInfo = styled.div`
  margin-bottom: 3rem;
`

const BasicInfoTitle = styled(SubTitle)``

const Name = styled.div`
  max-width: 30rem;
`

const Introduction = styled(Name)``

const TransactionType = styled(BasicInfo)``

const TransactionTypeTitle = styled(BasicInfoTitle)``

const Trading = styled(Name)``

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

const BankCode = styled(Name)``

const BankAccount = styled(Name)``

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const UpdateButton = styled(LargeButton)``

const CancelButton = styled(UpdateButton)`
  margin-right: 1rem;
  background: ${(props) => props.theme.general_200};
  &:hover {
    background: ${(props) => props.theme.general_300};
  }
`

export default function EditPortfolioPage() {
  const {
    user: { avatarUrl, email },
  } = useContext(AuthContext)
  const {
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
  } = useUserInfo()

  return (
    <Container>
      <PersonalInfo>
        <AvatarWrapper>
          <Img src={avatarUrl && avatarUrl.imgUrl} />
          <UploadAvatarBtn type="button" onClick={handleToggleAvatarPopUp}>
            編輯
          </UploadAvatarBtn>
        </AvatarWrapper>
        <Email>{email}</Email>
        <EditPasswordBtn type="button" onClick={handleTogglePasswordPopUp}>
          更改密碼
        </EditPasswordBtn>
        {avatarPopUp && (
          <UpdateAvatarPopUp
            handleToggleAvatarPopUp={handleToggleAvatarPopUp}
          />
        )}
        {passwordPopUp && (
          <UpdatePasswordPopUp
            handleTogglePasswordPopUp={handleTogglePasswordPopUp}
          />
        )}
      </PersonalInfo>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <BorderWrapper>
            <BasicInfo>
              <BasicInfoTitle>基本資料</BasicInfoTitle>
              <Name>
                <FormikControl
                  control="input"
                  label="暱稱"
                  name="nickname"
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
                  name="tradingOptions"
                  options={shippingOptions}
                />
                <Region>
                  <FormikControl
                    control="select"
                    label="縣市"
                    name="region"
                    options={regionOptions}
                    defaultOption={true}
                    onChange={(e) => {
                      handleChange(e, formik)
                    }}
                  />
                </Region>
                <District>
                  <FormikControl
                    control="select"
                    label="鄉鎮(市)區"
                    name="district"
                    options={districtOptions}
                  />
                </District>
              </Trading>
            </TransactionType>
            <TransferInfo>
              <TransferInfoTitle>匯款資訊</TransferInfoTitle>
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
                  name="accountNum"
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
