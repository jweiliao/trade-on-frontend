import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { MEDIA_QUERY_SM, MEDIA_QUERY_MD } from '../../styles/breakpoints'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import rwdSettings from './rwdSettings'
import { getAllPosts } from '../../WebAPI'

const Container = styled.div`
  width: 100%;
`

const Title = styled.h2`
  font-size: 1.3rem;
  font-weight: 550;
  line-height: 1.5;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
  ${MEDIA_QUERY_MD} {
    text-align: center;
  }
`

const StyledSlider = styled(Slider)`
  margin: 1.5rem 2rem 0;

  ${MEDIA_QUERY_SM} {
    margin: 1.5rem 0 0;
  }

  .slick-list {
    margin: 0 1rem;
    height: 15rem;
  }

  // 下方圓點
  .slick-dots {
    display: relative;
    bottom: -2.5rem;
  }

  .slick-dots li.slick-active button:before {
    color: ${(props) => props.theme.primary_200};
  }

  .slick-dots li:hover {
    button:before {
      color: ${(props) => props.theme.primary_250};
    }
  }

  // 左右箭頭
  .slick-prev:before,
  .slick-next:before {
    color: ${(props) => props.theme.primary_200};
  }
`

const Card = styled.div`
  height: 15rem;
  border-radius: 1rem;
  overflow: hidden;
  border: solid 1px ${(props) => props.theme.general_300};
  &:hover {
    img {
      opacity: 0.5;
      transition: all 0.5s ease 0s;
    }
  }
`

const Img = styled.img`
  width: 100%;
  height: 80%;
  display: block;
  margin: auto;
  object-fit: cover;
`

const Content = styled.div`
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: solid 1px ${(props) => props.theme.general_300};
`

const ItemName = styled.p`
  color: ${(props) => props.theme.secondary};
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
`

function Carousel() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await getAllPosts(12)
      setPosts(res.data.allPosts)
    }

    fetchPosts()
  }, [])

  return (
    <>
      {posts.length !== 0 && (
        <Container>
          <Title>快來把這些物品索取回家吧</Title>
          <StyledSlider {...rwdSettings}>
            {posts.map((post) => (
              <Card key={post.id} as={Link} to={`/givings/${post.id}`}>
                <Img alt={'物品圖片'} src={post.imgUrls[0].imgUrl} />
                <Content>
                  <ItemName>{post.itemName}</ItemName>
                </Content>
              </Card>
            ))}
          </StyledSlider>
        </Container>
      )}
    </>
  )
}

export default Carousel
