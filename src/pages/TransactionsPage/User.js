import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Img, ImgCircleWrapper } from '../../components/img'

const Wrapper = styled.div`
  display: flex;
`

const Avatar = styled(ImgCircleWrapper)`
  position: relative;
  display: inline-block;
  min-width: 1.5rem;
  min-height: 1.5rem;
`

const Email = styled.p`
  margin-left: 0.5rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.primary_300};
`

const Nickname = styled.span`
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.primary_300};
`

const User = (props) => {
  return (
    <Wrapper>
      <Avatar
        as={Link}
        to={
          props.behaviorFilter === props.give
            ? `/portfolio/${props.transaction.dealer._id}`
            : `/portfolio/${props.transaction.owner._id}`
        }
      >
        <Img
          src={
            props.behaviorFilter === props.give
              ? props.transaction.dealer.avatarUrl.imgUrl
              : props.transaction.owner.avatarUrl.imgUrl
          }
        />
      </Avatar>
      <Email
        as={Link}
        to={
          props.behaviorFilter === props.give
            ? `/portfolio/${props.transaction.dealer._id}`
            : `/portfolio/${props.transaction.owner._id}`
        }
      >
        {props.behaviorFilter === props.give
          ? props.transaction.dealer.email
          : props.transaction.owner.email}
      </Email>
      <Nickname
        as={Link}
        to={
          props.behaviorFilter === props.give
            ? `/portfolio/${props.transaction.dealer._id}`
            : `/portfolio/${props.transaction.owner._id}`
        }
      >
        {props.behaviorFilter === props.give
          ? props.transaction.dealer.nickname &&
            `(${props.transaction.dealer.nickname})`
          : props.transaction.owner.nickname &&
            `(${props.transaction.owner.nickname})`}
      </Nickname>
    </Wrapper>
  )
}

export default User
