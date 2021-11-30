import React, { useState, useEffect } from 'react'
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
  DangerSmallButton,
  BackstagePageButton,
} from '../../components/buttons'

import Swal from 'sweetalert2'

import Pagination from '../../components/Pagination/BackstagePagination'

import usePosts from '../../hooks/usePosts'

import { getAllPosts } from '../../WebAPI'

const Title = styled(BackstageTitle)``

const DeleteBtn = styled(DangerSmallButton)`
  margin: 0 auto;
`

const PaginationWrapper = styled.ul`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 2rem 0 4rem;
`

export default function ManageGivingPage() {
  const {
    posts,
    setPosts,
    currentPosts,
    handleDeletePost,
    postsPerPage,
    handleChangePostPage,
  } = usePosts()

  console.log(posts)

  const handleDelete = () => {
    Swal.fire({
      title: '刪除',
      text: '確定要刪除嗎？',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e25151',
      cancelButtonColor: '#B7B7B7',
      cancelButtonText: '不，取消刪除',
      confirmButtonText: '是的，我要刪除',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '刪除成功',
          text: '此筆資料已被刪除',
          icon: 'success',
          confirmButtonColor: '#bae8e8',
          confirmButtonText: '完成',
        })
      }
    })
  }

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
                <Row key={post.owner._id}>
                  <Data data-label="帳號">{post.owner.email}</Data>
                  <Data data-label="暱稱">{post.owner.name}</Data>
                  <Data data-label="物品名稱">{post.itemName}</Data>
                  <Data data-label="物品介紹">{post.description}</Data>
                  <Data data-label="上架時間">{post.createdAt}</Data>
                  <ButtonTableCell>
                    <DeleteBtn onClick={() => handleDelete(post.owner._id)}>
                      刪除
                    </DeleteBtn>
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
