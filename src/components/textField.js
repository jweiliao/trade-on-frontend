import styled from 'styled-components'
import { MEDIA_QUERY_SM } from '../styles/breakpoints'

export const Input = styled.input`
  display: block;
  height: 2.5rem;
  margin: 1.2rem 0;
  padding: 0 0.5rem;
  border: 0.1rem solid ${(props) => props.theme.secondary};
  border-radius: 0.25rem;
  outline: none;
`

export const InputPassword = styled(Input).attrs({ type: 'password' })``

export const Textarea = styled.textarea`
  display: block;
  padding: 0.5rem;
  margin: 1.2rem 0;
  border: 0.1rem solid ${(props) => props.theme.secondary};
  border-radius: 0.25rem;
  resize: none;
  outline: none;
  line-height: 1.5;
`

export const Select = styled.select`
  height: 2.5rem;
  margin: 1.2rem 0;
  padding: 0 0.5rem;
  border: 0.1rem solid ${(props) => props.theme.secondary};
  border-radius: 0.25rem;
  outline: none;
`

const CheckBoxWrapper = styled.label`
  display: block;
  position: relative;
  margin-top: 1.2rem;
  padding-left: 1.8rem;
  box-sizing: border-box;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: normal;
  line-height: 1.25;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  :hover input ~ span {
    background: ${(props) => props.theme.primary_100};
  }

  input:checked ~ span {
    background: ${(props) => props.theme.primary_200};
    border: none;
  }

  span:after {
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

  input:checked ~ span:after {
    display: block;
  }
`
const CheckBox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
  + span {
    position: absolute;
    top: 0;
    left: 0;
    height: 1.25rem;
    width: 1.25rem;
    border: 0.1rem solid ${(props) => props.theme.secondary};
    border-radius: 0.25rem;
  }
`

export const InputCheckBox = ({ label, isChecked }) => (
  <CheckBoxWrapper>
    {label}
    <CheckBox checked={isChecked} />
    <span></span>
  </CheckBoxWrapper>
)

const BackstageCheckBoxWrapper = styled.label`
  display: inline-block;
  height: 100%;
  width: 100%;
  position: relative;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  :hover input ~ span {
    background: ${(props) => props.theme.secondary_100};
  }

  input:checked ~ span {
    background: ${(props) => props.theme.secondary_200};
    border: none;
  }

  span:after {
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

  input:checked ~ span:after {
    display: block;
  }
`

const BackstageCheckBox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
  + span {
    position: absolute;
    right: 50%;
    bottom: 0;
    transform: translateX(50%) translateY(15%);
    height: 1.25rem;
    width: 1.25rem;
    border: 0.1rem solid ${(props) => props.theme.secondary};
    border-radius: 0.25rem;
    ${MEDIA_QUERY_SM} {
      right: 0;
      transform: translateX(-10%) translateY(20%);
    }
  }
`

export const BackstageInputCheckBox = ({ isChecked }) => (
  <BackstageCheckBoxWrapper>
    <BackstageCheckBox checked={isChecked} />
    <span></span>
  </BackstageCheckBoxWrapper>
)

export const StyledLabel = styled.label`
  display: block;
  margin: 10px 0;
`
export const StyledInput = styled.input`
  border: 1px solid ${(props) => props.inputColor};
  outline: none;
  $:focus,
  &:active {
    outline: none;
    border: 1px solid #f00;
  }
`

export const StyledSelect = styled.select``

export const StyledTextarea = styled.textarea`
  resize: none;
  overflow-x: hidden;
  border: 1px solid ${(props) => props.inputColor};
  outline: none;
  $:focus,
  &:active {
    outline: none;
    border: 1px solid #f00;
  }
`
export const StyledRadio = styled.input`
  padding: 10px !important;
`

export const StyledCheckbox = styled.input``
