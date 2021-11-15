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
import { BackstageInputCheckBox, Select } from '../../components/textField'
import {
  BackstageSmallButton,
  BackstagePageButton,
} from '../../components/buttons'

const Title = styled(BackstageTitle)``

const Checkbox = styled(BackstageInputCheckBox)``

const IdentitySelect = styled(Select)`
  height: 1.8rem;
  width: 6rem;
  margin: 0;
  padding: 0 0.3rem;
  font-size: 1rem;
`

const IdentityOption = styled.option``

const SaveBtn = styled(BackstageSmallButton)`
  margin: 0 auto;
`

const PaginationWrapper = styled.ul`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 2rem 0 4rem;
`

export default function ManageMemberPage() {
  return (
    <>
      <Title>會員管理</Title>
      <Table>
        <Head>
          <Row>
            <Heading>帳號</Heading>
            <Heading>暱稱</Heading>
            <Heading>身份</Heading>
            <Heading>贈物文發文</Heading>
            <Heading>贈物文留言</Heading>
            <Heading></Heading>
          </Row>
        </Head>
        <Body>
          <Row>
            <Data data-label="帳號">admin</Data>
            <Data data-label="暱稱">Admin</Data>
            <Data data-label="身份">
              <IdentitySelect>
                <IdentityOption>管理員</IdentityOption>
                <IdentityOption>一般會員</IdentityOption>
              </IdentitySelect>
            </Data>
            <Data data-label="贈物文發文">
              <Checkbox isChecked />
            </Data>
            <Data data-label="贈物文留言">
              <Checkbox isChecked />
            </Data>
            <ButtonTableCell>
              <SaveBtn>儲存</SaveBtn>
            </ButtonTableCell>
          </Row>
          <Row>
            <Data data-label="帳號">jane0901</Data>
            <Data data-label="暱稱">Jane</Data>
            <Data data-label="身份">
              <IdentitySelect>
                <IdentityOption>管理員</IdentityOption>
                <IdentityOption selected>一般會員</IdentityOption>
              </IdentitySelect>
            </Data>
            <Data data-label="贈物文發文">
              <Checkbox />
            </Data>
            <Data data-label="贈物文留言">
              <Checkbox />
            </Data>
            <ButtonTableCell>
              <SaveBtn>儲存</SaveBtn>
            </ButtonTableCell>
          </Row>
        </Body>
      </Table>
      <PaginationWrapper>
        <BackstagePageButton>&lt;</BackstagePageButton>
        <BackstagePageButton>1</BackstagePageButton>
        <BackstagePageButton>2</BackstagePageButton>
        <BackstagePageButton>&gt;</BackstagePageButton>
      </PaginationWrapper>
    </>
  )
}
