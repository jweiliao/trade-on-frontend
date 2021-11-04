import styled from 'styled-components'
import { TextTab } from '../../components/tabs'
import { Input, InputPassword } from '../../components/textField'
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

const Divider = styled.div`
  border-top: 0.1rem solid ${(props) => props.theme.general_500};
  height: 0.1rem;
  box-sizing: border-box;
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

export default function LoginPage() {
  return (
    <Wrapper>
      <Title>TRADE ON</Title>
      <Divider />
      <TabWrapper>
        <TextTab to="/login" $isActive="true">
          登入
        </TextTab>
        <TextTab to="/register">註冊</TextTab>
      </TabWrapper>
      <InputWrapper>
        <InputText placeholder="信箱" />
        <InputHide placeholder="密碼" />
      </InputWrapper>
      <SuperLargeButton>登入</SuperLargeButton>
    </Wrapper>
  )
}
