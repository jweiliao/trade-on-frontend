import styled from 'styled-components'
import Container from '../../components/Container'
import { SmallButton, LargeButton } from '../../components/buttons'
import { Input, Textarea, InputCheckBox } from '../../components/textField'
import { SubTitle } from '../../components/heading'
import { MEDIA_QUERY_SM } from '../../styles/breakpoints'

const BorderWrapper = styled(Container)`
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

const NickName = styled.p`
  font-size: 1.125rem;
`

const NickNameInput = styled(Input)`
  width: 20rem;
  ${MEDIA_QUERY_SM} {
    width: 100%;
  }
`

const Introduce = styled(NickName)``

const IntroduceContent = styled(Textarea)`
  width: 27rem;
  height: 7.5rem;
  ${MEDIA_QUERY_SM} {
    width: 100%;
    height: 8.5rem;
  }
`

const TransactionType = styled(BasicInfo)``

const TransactionTypeTitle = styled(BasicInfoTitle)``

const TransactionTypeOption = styled(InputCheckBox)``

const Counties = styled(NickName)`
  display: inline-block;
  margin: 0.8rem 0 0 1.8rem;
`

const CountiesSelect = styled.select`
  height: 1.8rem;
  width: 5.5rem;
  margin-left: 0.5rem;
  padding: 0 0.3rem;
  border: 0.1rem solid ${(props) => props.theme.secondary};
  border-radius: 0.25rem;
  outline: none;
  font-size: 1rem;
`

const CountiesOption = styled.option`
  color: ${(props) => props.theme.secondary};
`

const District = styled(Counties)``

const DistrictInput = styled(NickNameInput)`
  display: inline-block;
  width: 6rem;
  margin: 0;
  margin-left: 0.5rem;
  height: 1.8rem;
  font-size: 1rem;
`

const TransferInfo = styled(BasicInfo)``

const TransferInfoTitle = styled(BasicInfoTitle)``

const Note = styled.span`
  font-size: 1rem;
`

const BankNumber = styled(NickName)``

const BankNumberInput = styled(NickNameInput)``

const BankName = styled(NickName)``

const BankNameInput = styled(NickNameInput)``

const BankAccount = styled(NickName)``

const BankAccountInput = styled(NickNameInput)``

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
  return (
    <Container>
      <BorderWrapper>
        <PersonalInfo>
          <AvatarWrapper>
            <Avatar src={`https://i.pravatar.cc/300`} />
            <UploadAvatarBtn>編輯</UploadAvatarBtn>
          </AvatarWrapper>
          <Email>janejane8491@gmail.com</Email>
          <EditPasswordBtn>更改密碼</EditPasswordBtn>
        </PersonalInfo>
        <BasicInfo>
          <BasicInfoTitle>基本資料</BasicInfoTitle>
          <NickName>暱稱</NickName>
          <NickNameInput value="萊斯裡有點粉紅" />
          <Introduce>自我介紹（限 100 字）</Introduce>
          <IntroduceContent />
        </BasicInfo>
        <TransactionType>
          <TransactionTypeTitle>偏好交易方式</TransactionTypeTitle>
          <TransactionTypeOption label="7-11 店到店" />
          <TransactionTypeOption label="全家店到店" />
          <TransactionTypeOption isChecked label="面交" />
          <Counties>
            縣市
            <CountiesSelect>
              <CountiesOption value="">請選擇</CountiesOption>
              <CountiesOption>台北市</CountiesOption>
            </CountiesSelect>
          </Counties>
          <District>
            鄉鎮[市]區
            <DistrictInput />
          </District>
        </TransactionType>
        <TransferInfo>
          <TransferInfoTitle>
            匯款資訊<Note>（僅在交易中顯示）</Note>
          </TransferInfoTitle>
          <BankNumber>銀行代碼</BankNumber>
          <BankNumberInput />
          <BankName>銀行名稱</BankName>
          <BankNameInput />
          <BankAccount>帳號</BankAccount>
          <BankAccountInput />
        </TransferInfo>
        <ButtonsWrapper>
          <CancelButton>取消</CancelButton>
          <UpdateButton>提交</UpdateButton>
        </ButtonsWrapper>
      </BorderWrapper>
    </Container>
  )
}
