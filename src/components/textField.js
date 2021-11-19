import styled from 'styled-components'
import { MEDIA_QUERY_SM } from '../styles/breakpoints'

export const InputLabel = styled.label`
  font-size: 1.125rem;
  display: block;
  margin-top: 1.2rem;
`

export const Input = styled.input`
  display: block;
  height: 2.5rem;
  width: 100%;
  margin-top: 1.2rem;
  padding: 0 0.5rem;
  color: ${(props) => props.theme.secondary};
  border: 0.1rem solid ${(props) => props.theme.secondary};
  border-radius: 0.25rem;
  outline: none;
`

export const InputPassword = styled(Input).attrs({ type: 'password' })``

export const InputFile = styled.input.attrs({ type: 'file' })`
  margin-top: 1.2rem;
  accept: 'image/png, image/jpeg';
`

export const Textarea = styled.textarea`
  display: block;
  height: 10rem;
  width: 100%;
  padding: 0.5rem;
  margin-top: 1.2rem;
  border: 0.1rem solid ${(props) => props.theme.secondary};
  border-radius: 0.25rem;
  resize: none;
  outline: none;
  line-height: 1.5;
`

export const Select = styled.select`
  height: 2.5rem;
  width: 100%;
  margin-top: 1.2rem;
  padding: 0 0.5rem;
  border: 0.1rem solid ${(props) => props.theme.secondary};
  border-radius: 0.25rem;
  outline: none;
  color: ${(props) => props.theme.secondary};
  option[value=''] {
    display: none;
  }
`

export const CheckBoxLabel = styled.label`
  display: block;
  position: relative;
  margin-top: 1.2rem;
  padding-left: 1.8rem;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: normal;
  line-height: 1.25;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  :hover span {
    background: ${(props) => props.theme.primary_100};
  }
`
export const CheckBox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
  :checked ~ span {
    background: ${(props) => props.theme.primary_200};
    border: none;
  }

  :checked ~ span:after {
    display: block;
  }
`

export const CheckBoxSpan = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 1.25rem;
  width: 1.25rem;
  border: 0.1rem solid ${(props) => props.theme.secondary};
  border-radius: 0.25rem;

  :after {
    content: '';
    position: absolute;
    display: none;
    left: 0.4rem;
    top: 0.15rem;
    width: 0.3rem;
    height: 0.6rem;
    border: solid ${(props) => props.theme.general_000};
    border-width: 0 0.2rem 0.2rem 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`

export const InputCheckBox = ({ label, isChecked }) => (
  <CheckBoxLabel>
    {label}
    <CheckBox checked={isChecked} />
    <CheckBoxSpan />
  </CheckBoxLabel>
)

const BackstageCheckBoxLabel = styled(CheckBoxLabel)`
  margin: 0;
  padding: 0;
  position: static;
  :hover input ~ span {
    background: ${(props) => props.theme.secondary_100};
  }

  input:checked ~ span {
    background: ${(props) => props.theme.secondary_200};
    border: none;
  }
  ${MEDIA_QUERY_SM} {
    position: relative;
    height: 1.25rem;
  }
`

const BackstageCheckBox = styled(CheckBox)``

const BackstageCheckBoxSpan = styled(CheckBoxSpan)`
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border: 0.1rem solid ${(props) => props.theme.secondary};
  ${MEDIA_QUERY_SM} {
    left: 100%;
    transform: translateX(-100%) translateY(-50%);
  }
`

export const BackstageInputCheckBox = ({ isChecked }) => (
  <BackstageCheckBoxLabel>
    <BackstageCheckBox checked={isChecked} />
    <BackstageCheckBoxSpan />
  </BackstageCheckBoxLabel>
)
