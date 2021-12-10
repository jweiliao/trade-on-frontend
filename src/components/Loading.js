import React from 'react'
import styled, { keyframes } from 'styled-components'

const bubbling = keyframes`
  from{
    width: 2rem;
    height: 2rem;
    background-color:rgb(255,217,3);
    transform: translateY(0);
  }

  to {
    width: 5rem;
    height: 5rem;
    background-color:rgb(255,255,255);
    transform: translateY(-81px);
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.general_000};
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
`

const BubbleWrapper = styled.div`
  text-align: center;
  width: 310px;
  height: 194px;
  span:nth-of-type(1) {
    animation-delay: 0s;
  }
  span:nth-of-type(2) {
    animation-delay: 0.45s;
  }
  span:nth-of-type(3) {
    animation-delay: 0.9s;
  }
`

const Bubble = styled.span`
  display: inline-block;
  vertical-align: middle;
  width: 2rem;
  height: 2rem;
  margin: 5.5rem auto;
  background: rgb(255, 217, 3);
  border-radius: 194px;
  animation: ${bubbling} 1.5s infinite alternate;
`

export default function Loading() {
  return (
    <Wrapper>
      <BubbleWrapper>
        <Bubble />
        <Bubble />
        <Bubble />
      </BubbleWrapper>
    </Wrapper>
  )
}
