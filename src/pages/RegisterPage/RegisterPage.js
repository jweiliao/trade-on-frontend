import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { TextTab } from '../../components/tabs'
import { Input, InputPassword, InputCheckBox } from '../../components/textField'
import { SuperLargeButton } from '../../components/buttons'

const Wrapper = styled.div`
  width: 500px;
  max-width: 94%;
  margin: 5rem auto;
  border: 0.1rem solid ${(props) => props.secondary};
  border-radius: 0.1rem;
  padding: 3rem 2.5rem 4.5rem;
`

const Title = styled.h1`
  text-align: center;
  margin: 0 0 1.25rem;
`

const Divider = styled.hr`
  margin-bottom: 3.5rem;
`

const TabWrapper = styled.div`
  margin-bottom: 2rem;
`

const InputWrapper = styled.div`
  margin-bottom: 4rem;
`

const InputText = styled(Input)`
  width: 100%;
`

const InputHide = styled(InputPassword)`
  width: 100%;
`

const AgreeItemLink = styled(Link)`
  text-decoration: underline;
  color: ${(props) => props.theme.secondary};
`

export default function RegisterPage() {
  return (
    <Wrapper>
      <Title>TRADE ON</Title>
      <Divider />
      <TabWrapper>
        <TextTab to="/login">登入</TextTab>
        <TextTab to="/register" $isActive="true">
          註冊
        </TextTab>
      </TabWrapper>
      <InputWrapper>
        <InputText placeholder="信箱" />
        <InputText placeholder="暱稱" />
        <InputHide placeholder="密碼" />
        <InputHide placeholder="確認密碼" />
        <InputCheckBox
          label={
            <>
              我同意 TRADE ON 的<span> </span>
              <AgreeItemLink to="/terms" target="_blank">
                會員條款
              </AgreeItemLink>
              <span> </span>與<span> </span>
              <AgreeItemLink to="/privacy" target="_blank">
                隱私權政策
              </AgreeItemLink>
            </>
          }
        />
      </InputWrapper>
      <SuperLargeButton>註冊</SuperLargeButton>
    </Wrapper>
  )
}
