import React from 'react'
import styled from 'styled-components'
import { TextTab } from './tabs'

const TabsWrapper = styled.div`
  margin: 3rem 0 1.5rem;
  display: flex;
  justify-content: center;
  text-align: center;
`

const Behavior = styled(TextTab)`
  font-size: 1.5rem;
  text-align: center;
  margin: 0 2rem;
  width: 3.5rem;
`

const BehaviorTab = ({ handleChangeBehavior, behaviorFilter, scrollRef }) => {
  const give = '贈物'
  const receive = '索物'
  const behaviors = [give, receive]

  return (
    <TabsWrapper>
      {behaviors.map((behavior, index) => {
        return (
          <Behavior
            key={index}
            onClick={() => {
              handleChangeBehavior(behavior)
            }}
            $isActive={behaviorFilter === behavior ? true : false}
            ref={scrollRef}
          >
            {behavior}
          </Behavior>
        )
      })}
    </TabsWrapper>
  )
}

export default BehaviorTab
