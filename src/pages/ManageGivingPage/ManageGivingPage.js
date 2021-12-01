import styled from 'styled-components'
import { BackstageTitle } from '../../components/heading'
import {
  Table,
  Head,
  Row,
  Heading,
  Body,
  Data,
  ButtonTableCell,
} from '../../components/table'

import { BackstageSmallButton } from '../../components/buttons'

import Pagination from '../../components/Pagination/BackstagePagination'

import usePosts from '../../hooks/usePosts'

const Title = styled(BackstageTitle)``

const PublishBtn = styled(BackstageSmallButton)`
  margin: 0 auto;
  background-color: ${(props) =>
    props.isPublic ? props.theme.secondary_100 : props.theme.secondary};
  color: ${(props) =>
    props.isPublic ? props.theme.secondary : props.theme.general_000};
  &:hover {
    background-color: ${(props) =>
      props.isPublic ? props.theme.secondary_200 : props.theme.secondary};
  }
`

export default function ManageGivingPage() {
  const {
    posts,
    currentPosts,
    postsPerPage,
    handleToggleIsPublic,
    handleChangePostPage,
  } = usePosts()

  console.log(posts)

  return (
    <>
      <Title>贈物文管理</Title>
      <Table>
        <Head>
          <Row>
            <Heading>帳號</Heading>
            <Heading>暱稱</Heading>
            <Heading>物品名稱</Heading>
            <Heading>物品介紹</Heading>
            <Heading>上架時間</Heading>
            <Heading></Heading>
          </Row>
        </Head>
        <Body>
          {currentPosts.map((post) => {
            return (
              <>
                <Row key={post.id}>
                  <Data data-label="帳號">{post.owner.email}</Data>
                  <Data data-label="暱稱">{post.owner.nickname}</Data>
                  <Data data-label="物品名稱">{post.itemName}</Data>
                  <Data data-label="物品介紹">{post.description}</Data>
                  <Data data-label="上架時間">{post.createdAt}</Data>
                  <ButtonTableCell>
                    <PublishBtn
                      onClick={() =>
                        handleToggleIsPublic(post.id, post.isPublic)
                      }
                      isPublic={post.isPublic}
                    >
                      {post.isPublic ? '下架' : '上架'}
                    </PublishBtn>
                  </ButtonTableCell>
                </Row>
              </>
            )
          })}
        </Body>
      </Table>
      <Pagination
        dataPerPage={postsPerPage}
        totalData={posts.length}
        handleChangePage={handleChangePostPage}
      />
    </>
  )
}
