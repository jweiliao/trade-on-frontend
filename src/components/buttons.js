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
    background: ${(props) => props.theme.primary_250};
  }

  &:disabled {
    cursor: auto;
    color: ${(props) => props.theme.general_600};
    background: ${(props) => props.theme.primary_100};
  }
`

export const DangerSmallButton = styled(SmallButton)`
  background: ${(props) => props.theme.danger_000};
  color: ${(props) => props.theme.general_100};
  &:hover {
    background: ${(props) => props.theme.danger_100};
  }
`

export const BackstageSmallButton = styled(SmallButton)`
  background: ${(props) => props.theme.secondary_100};
  &:hover {
    background: ${(props) => props.theme.secondary_200};
  }
`

export const GraySmallButton = styled(SmallButton)`
  background-color: ${(props) => props.theme.general_200};
  &:hover {
    background-color: ${(props) => props.theme.general_300};
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

export const PageButton = styled.li`
  width: 3rem;
  height: 3rem;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: solid 1px ${(props) => props.theme.general_500};
  :not(:first-child) {
    border-left: 0px;
  }
  color: ${(props) => props.theme.primary_300};
  &:hover {
    background-color: ${(props) => props.theme.primary_100};
  }
`

export const BackstagePageButton = styled(PageButton)`
  color: ${(props) => props.theme.secondary};
  &:hover {
    background-color: ${(props) => props.theme.secondary_100};
  }
`
