import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Container from '../../components/Container'
import { MEDIA_QUERY_MD } from '../../styles/breakpoints'
import { MediumButton } from '../../components/buttons'
import {
  Cards,
  Card,
  CardImage,
  CardContent,
  CardTitle,
  EmptyCard,
} from '../../components/card'
import Pagination from '../../components/Pagination/Pagination'
import givingsbanner from '../../images/givingsBanner.svg'
import { getAllPosts } from '../../WebAPI'

const Banner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5rem;
  ${MEDIA_QUERY_MD} {
    flex-direction: column;
  }
`

const BannerTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 3rem;
  ${MEDIA_QUERY_MD} {
    margin: 0;
  }
`

const Title = styled.h1`
  color: ${(props) => props.theme.primary_200};
  font-size: 3.5rem;
  letter-spacing: 0.4rem;
  margin-bottom: 2rem;
`

const SubTitle = styled.h2`
  color: ${(props) => props.theme.primary_200};
  line-height: 1.5;
  letter-spacing: 0.5px;
`

const BannerImageWrapper = styled.div``

const BannerImage = styled.img`
  width: 100%;
`

const UploadGiftButton = styled(MediumButton)`
  margin-bottom: 2rem;
`

export default function GivingsPage() {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 12

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await getAllPosts(100)
      setPosts(res.data.allPosts)
    }

    fetchPosts()
  }, [])

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  const handleChangePage = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <Container>
      <Banner>
        <BannerImageWrapper>
          <BannerImage src={givingsbanner} />
        </BannerImageWrapper>
        <BannerTextWrapper>
          <Title>禮物區</Title>
          <UploadGiftButton as={Link} to="/givings/add">
            上傳禮物
          </UploadGiftButton>
          <SubTitle>目前上架中的禮物有...</SubTitle>
        </BannerTextWrapper>
      </Banner>
      <Cards>
        {currentPosts.map((post) => (
          <Card key={post.id} as={Link} to={`/givings/${post.id}`}>
            <CardImage alt={'物品圖片'} src={`post.imgUrls`}></CardImage>
            <CardContent>
              <CardTitle>{post.itemName}</CardTitle>
            </CardContent>
          </Card>
        ))}
        <EmptyCard />
        <EmptyCard />
        <EmptyCard />
      </Cards>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        handleChangePage={handleChangePage}
        currentPage={currentPage}
      />
    </Container>
  )
}
