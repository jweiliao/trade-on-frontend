import styled from 'styled-components'

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

const CheckBoxWrapper = styled.label`
  display: block;
  position: relative;
  padding: 0.03rem 0 0.03rem 1.8rem;
  box-sizing: border-box;
  font-size: 1rem;
  font-style: normal;
  font-weight: normal;
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
    border: solid white;
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

export const InputCheckBox = ({ label }) => (
  <CheckBoxWrapper>
    {label}
    <CheckBox />
    <span></span>
  </CheckBoxWrapper>
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
