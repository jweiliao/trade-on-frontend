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
  min-height: 2rem;
  min-width: 2rem;
`

const Email = styled.p`
  line-height: 2rem;
  margin-left: 0.5rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.primary_300};
`

const Nickname = styled.span`
  line-height: 2rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.primary_300};
`

const User = ({ user }) => {
  return (
    <Wrapper>
      <Avatar as={Link} to={`/portfolio/${user._id}`}>
        <Img src={user.avatarUrl} />
      </Avatar>
      <Email as={Link} to={`/portfolio/${user._id}`}>
        {user.email}
      </Email>
      {user.nickname && (
        <Nickname as={Link} to={`/portfolio/${user._id}`}>
          ({user.nickname})
        </Nickname>
      )}
    </Wrapper>
  )
}

export default User
