import React from 'react'
import styled from 'styled-components'

/* button/btn_small */
export const SmallButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 93px;
  height: 36px;
  padding: 14px 8px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 1.25px;
  text-transform: uppercase;
  background: ${(props) => props.theme.primary_200};
  border-radius: 4px;
  border: none;

  /* brand/secondary/purple */
  color: ${(props) => props.theme.secondary};

  &:hover {
    background-color: ${(props) => props.theme.primary_100};
  }
`

/* button/btn_medium */
export const MediumButton = styled.button`
  display: flex;
  align-items: center;
  text-align: center;
  width: 160px;
  height: 51px;
  padding: 12px 42px;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  background: ${(props) => props.theme.primary_200};
  border-radius: 4px;
  border: none;

  /* brand/secondary/purple */
  color: ${(props) => props.theme.secondary};

  &:hover {
    background-color: ${(props) => props.theme.primary_100};
  }
`

const SuperLargeButton = styled(SmallButton)`
  width: 100%;
  height: 44px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.5px;
`

export const CenterLargeButton = styled(SuperLargeButton)`
  max-width: 120px;
  margin: 30px auto;
`

// label：寫按鈕上面的文字
export const ButtonSmall = ({ label }) => <SmallButton>{label}</SmallButton>
export const ButtonMedium = ({ label }) => <MediumButton>{label}</MediumButton>
export const ButtonSuperLarge = ({ label }) => (
  <SuperLargeButton>{label}</SuperLargeButton>
)
