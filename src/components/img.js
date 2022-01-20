import styled from 'styled-components'

export const Img = styled.img`
  max-height: 100%;
  max-width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`

export const ImgWrapper = styled.div`
  position: relative;
  border: solid 1px ${(props) => props.theme.general_200};
  border-radius: 0.25rem;
`

export const ImgCircleWrapper = styled(ImgWrapper)`
  border-radius: 50%;
  overflow: hidden;
`
