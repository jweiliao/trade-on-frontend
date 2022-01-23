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
import {
  BackstageSmallButton,
  DangerSmallButton,
} from '../../components/buttons'
import Pagination from '../../components/Pagination/BackstagePagination'
import usePosts from '../../hooks/usePosts'

const Title = styled(BackstageTitle)``

const PublishBtn = styled(BackstageSmallButton)`
  margin: 0 auto;
`

const SetPrivateBtn = styled(DangerSmallButton)`
  margin: 0 auto;
`

export default function ManageGivingPage() {
  const {
    posts,
    currentPosts,
    WordLimit,
    postsPerPage,
    handleToggleIsPublic,
    currentPostsPage,
    handleChangePostPage,
  } = usePosts()

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
            <Heading>更新時間</Heading>
            <Heading />
          </Row>
        </Head>
        <Body>
          {currentPosts.map((post) => {
            return (
              <Row key={post.id}>
                <Data data-label="帳號">{post.author.email}</Data>
                <Data data-label="暱稱">{post.author.nickname}</Data>
                <Data data-label="物品名稱">{post.itemName}</Data>
                <Data data-label="物品介紹">
                  {post.description.slice(0, WordLimit)}
                  {post.description.slice(WordLimit) && '...'}
                </Data>
                <Data data-label="更新時間">{post.createdAt}</Data>
                <ButtonTableCell>
                  {post.isPublic ? (
                    <SetPrivateBtn
                      onClick={() =>
                        handleToggleIsPublic(post.id, post.isPublic)
                      }
                    >
                      下架
                    </SetPrivateBtn>
                  ) : (
                    <PublishBtn
                      onClick={() =>
                        handleToggleIsPublic(post.id, post.isPublic)
                      }
                    >
                      上架
                    </PublishBtn>
                  )}
                </ButtonTableCell>
              </Row>
            )
          })}
        </Body>
      </Table>
      <Pagination
        dataPerPage={postsPerPage}
        totalData={posts.length}
        handleChangePage={handleChangePostPage}
        currentPage={currentPostsPage}
      />
    </>
  )
}
