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
  cursor: pointer;

  /* brand/secondary/purple */
  color: ${(props) => props.theme.secondary};

  &:hover {
    background-color: ${(props) => props.theme.primary_250};
  }
`

export const DangerSmallButton = styled(SmallButton)`
  background: ${(props) => props.theme.danger_000};
  color: ${(props) => props.theme.general_100};
  :hover {
    background: ${(props) => props.theme.danger_100};
  }
`

/* button/btn_medium */
export const MediumButton = styled(SmallButton)`
  width: 160px;
  height: 51px;
  padding: 12px 42px;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: 0.5px;
`

/* button/btn_large */
export const LargeButton = styled(SmallButton)`
  width: 245px;
  height: 51px;
  padding: 12px 42px;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: 0.5px;
`

/* button/btn_super large */
export const SuperLargeButton = styled(SmallButton)`
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
