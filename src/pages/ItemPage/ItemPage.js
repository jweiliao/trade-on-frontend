import React, { useState, useEffect, useContext } from 'react'
import Swal from 'sweetalert2'
import AuthContext from '../../contexts'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import Container from '../../components/Container'
import { MEDIA_QUERY_SM, MEDIA_QUERY_MD } from '../../styles/breakpoints'
import { LargeButton } from '../../components/buttons'
import itemGoal from '../../images/itemGoal.svg'
import { Img, ImgCircleWrapper } from '../../components/img'

// 引入 react icons
import * as FaIcons from 'react-icons/fa'
import * as MdIcons from 'react-icons/md'
import * as ImIcons from 'react-icons/im'

// 引入 AsNavFor （圖片輪播）
// import AsNavFor from './AsNavFor'

// 引入 ImageSlides （圖片輪播）
import ImageSlides from './ImageSlides'

// 引入 留言
import { Comments } from './comments'

// 引入撈取單筆 post 的 API
import { getPost } from '../../WebAPI'

/* 禮物詳情頁最上方 "物品" 資訊的全部區塊 */
const GiftDetails = styled.div`
  // max-width: 960px;
  max-width: 90%;
  margin-top: 50px;
  margin-left: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  ${MEDIA_QUERY_SM} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    margin-left: 0px;
  }
`

/* "物品" 資訊：左側全部的區塊 */
const DetailLeft = styled.div`
  width: 527px;
  height: 626px;

  ${MEDIA_QUERY_SM} {
    width: 100%;
    height: 500px;
    margin-bottom: 0px auto;
  }
`
/* "物品" 資訊：右側全部的區塊 */
const DetailRight = styled.div`
  width: 340px;
  height: 626px;
  font-size: 18px;
  line-height: 1.5;
  letter-spacing: 0.15px;
  margin-left: 25px;

  ${MEDIA_QUERY_SM} {
    width: 100%;
    margin-top: 30px;
    margin-bottom: 250px;
  }
`
/* "物品" 資訊右側：贈物者資訊 */
const Donor = styled.div`
  margin-bottom: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  ${MEDIA_QUERY_MD} {
    margin-bottom: 0px;
  }
`

/* 贈物者頭像 */
const AvatarImg = styled(ImgCircleWrapper)`
  min-width: 50px;
  min-height: 50px;
  margin-right: 1rem;
  cursor: pointer;
  // border: none;
  ${MEDIA_QUERY_MD} {
    position: relative;
    left: 0;
  }
  ${MEDIA_QUERY_SM} {
    max-width: 50px;
    max-height: 50px;
    margin: 0 auto 1rem;
    margin-right: 0.4rem;
  }
`

/* 贈物者頭像圖片 */
const UserImg = styled(Img)`
  min-width: 50px;
  min-height: 50px;
  object-fit: cover;
  object-position: center center;
`

/* 贈物者暱稱 */
const DonorNickname = styled(Link)`
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.5px;
  color: inherit;
  // text-decoration: none;
`

/* "物品" 資訊右側：物品名稱 */
const GiftTitle = styled.div`
  margin-bottom: 40px;
  padding-bottom: 10px;
  border-bottom: 2px solid ${(props) => props.theme.general_500};
  font-size: 26px;
  line-height: 1.5;
  letter-spacing: 0.5px;
`

/* "物品" 資訊右側：物品細節 */
const GiftDetail = styled.ul`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.5px;
`

/* 分類、寄送地點、寄送方式、物品狀態、運費支付 */
const GiftItems = styled.li`
  display: flex;
  margin-bottom: 30px;
  align-items: flex-start;
  ${MEDIA_QUERY_SM} {
    margin-bottom: 30px;
  }
`

/* 每一項物品細節前的 icon */
const Icon = styled.div`
  width: 26px;
  height: 26px;
  display: block;
  margin-top: 0.4em;
  color: ${(props) => props.theme.primary_300};
`

/* 每一項物品細節的內容 */
const Label = styled.div`
  margin-left: 17px;
  font-size: 1.35rem;
  // ${MEDIA_QUERY_SM} {
  //   font-size: 3.5vmin;
  // }
`

/* 每一項寄送方式的內容 */
const TradingOptions = styled.div`
  margin-top: 6px;
`

/* "編輯禮物" 、"想要禮物" 按鈕 */
const HandleGiftButton = styled(LargeButton)`
  margin-top: 30px;
  font-size: 20px;
  max-width: 100%;
`

/* 禮物詳情頁下方的全部區塊 */
const GiftContent = styled.div`
  // margin-top: 6rem;
`

/* 禮物詳情頁的 "物品介紹" 區塊 */
const GiftIntro = styled.div`
  // max-width: 557px;
  max-width: 54%;
  margin: -65px 0px 100px 0px;
  margin-left: 22px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-bottom: 2px solid ${(props) => props.theme.general_500};

  ${MEDIA_QUERY_SM} {
    max-width: 90%;
  }
`
/* 物品介紹的標題 */
const IntroTitle = styled.div`
  border-left: 10px solid ${(props) => props.theme.primary_200};
  padding-left: 17px;
  font-size: 24px;
  margin-bottom: 50px;
`

/* 物品介紹的內文 */
const IntroContent = styled.div`
  white-space: pre-line;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.5px;
  margin-bottom: 50px;
  white-space: pre-line;
`
/* 交易完成時顯示的圖片 */
const GoalImage = styled.img`
  max-width: 25%;
  margin-left: 33px;
  margin-bottom: -26px;

  ${MEDIA_QUERY_SM} {
    margin-left: 15px;
    margin-bottom: -18px;
  }
`

export default function ItemPage() {
  // 拿到 使用者登入後的 localStorage 資料
  const { user } = useContext(AuthContext)

  // 取得 URL 上 id 的參數
  const { id } = useParams()

  // 設定申請索取的彈出視窗的 state
  const [wantPopUp, setWantPopUp] = useState(false)

  // toggle 彈出視窗：若已顯示，則收起彈窗；否則跳出彈窗
  const handleToggleWantPopUp = (id) => {
    setWantPopUp(!wantPopUp)
  }

  const alertIsAllowMessage = (id) => {
    if (user.isAllowMessage) {
      handleToggleWantPopUp(id)
    } else {
      Swal.fire({
        icon: 'warning',
        title: '警告',
        text: '此帳號已被禁止留言',
        showConfirmButton: false,
      })
    }
  }

  // 設定 post 的 state
  const [post, setPost] = useState({})

  // 設定是否已在交易進程的 state
  const [isDealLimit, setIsDealLimit] = useState(false)

  // 設定 icon 尺寸的 state
  const iconSize = 25

  useEffect(() => {
    // 串接拿到單筆的 post 的 API
    const fetchPost = async () => {
      const res = await getPost(id)

      if (res.data.message === 'success') {
        // 成功拿到資料後，將資料更新到 post 的 state
        setPost(res.data.post)
        // 成功拿到資料後，將 isDealLimit 的資料更新到 isDealLimit 的 state
        setIsDealLimit(res.data.isDealLimit)
      }
    }

    fetchPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Container>
        {/* 禮物詳情頁最上方的 "物品" 資訊 */}
        <GiftDetails>
          {/* "物品" 資訊：左側 */}
          <DetailLeft>
            {/* 圖片輪播 */}
            {/*  帶入 post 的資料到 props*/}
            <ImageSlides post={post}></ImageSlides>
          </DetailLeft>

          {/* "物品" 資訊：右側 */}
          <DetailRight>
            {/* "物品" 資訊右側：贈物者資訊 */}
            {/* 由於非同步的關係, 確認先有 post 的 author 資料,再撈 author 下一層的物件 */}
            {post.author && post.author._id && (
              <Donor>
                {/* 贈物者頭像 */}
                {/* <Link to={`/portfolio/${post.author._id}`}>
                  <DonorAvatar src={post.author.avatarUrl.imgUrl}></DonorAvatar>
                </Link> */}
                <Link to={`/portfolio/${post.author._id}`}>
                  <AvatarImg>
                    <UserImg src={post.author.avatarUrl.imgUrl} />
                  </AvatarImg>
                </Link>

                {/* 贈物者暱稱 */}
                <DonorNickname to={`/portfolio/${post.author._id}`}>
                  {post.author.nickname}
                </DonorNickname>
              </Donor>
            )}

            {/* "物品" 資訊右側：物品名稱 */}
            <GiftTitle>
              {post.itemName}
              {post.isGoal ? <GoalImage src={itemGoal} /> : null}
            </GiftTitle>

            {/* "物品" 資訊右側：物品細節 */}
            <GiftDetail>
              {/* 分類 */}
              <GiftItems>
                <Icon>
                  <FaIcons.FaTags size={iconSize} />
                </Icon>
                <Label>{post.category && post.category.categoryName}</Label>
              </GiftItems>

              {/* 寄送地點 */}
              {/* 如果寄送方式有包含 "面交" 時才顯示 */}
              {post.tradingOptions && post.tradingOptions.faceToFace && (
                <GiftItems>
                  <Icon>
                    <ImIcons.ImLocation size={iconSize} />
                  </Icon>
                  <Label>
                    {post.tradingOptions.faceToFace.region}
                    {post.tradingOptions.faceToFace.district}
                  </Label>
                </GiftItems>
              )}

              {/* 物品狀態 */}
              <GiftItems>
                <Icon>
                  <FaIcons.FaInfoCircle size={iconSize} />
                </Icon>
                <Label>物品狀態： {post.itemStatus}</Label>
              </GiftItems>

              {/* 運費支付 */}
              <GiftItems>
                <Icon>
                  <MdIcons.MdMonetizationOn size={iconSize + 3} />
                </Icon>
                <Label>運費支付：由{post.payer}支付</Label>
              </GiftItems>

              {/* 寄送方式 */}
              <GiftItems>
                <Icon>
                  <FaIcons.FaTruckLoading size={iconSize} />
                </Icon>
                <Label>
                  寄送方式：
                  <br />
                  {/* 面交、7-11 店到店、全家店到店 */}
                  {/* {post.tradingOptions &&
                    post.tradingOptions.selectedMethods &&
                    post.tradingOptions.selectedMethods
                      .map((item) => {
                        if (item === '面交') return '面交'
                        if (item === '7-11') return '7-11 店到店'
                        if (item === '全家') return '全家店到店'
                        return false
                      })
                      .join('/')} */}
                  {post.tradingOptions &&
                    post.tradingOptions.selectedMethods &&
                    post.tradingOptions.selectedMethods.map((item, index) => {
                      if (item === '面交')
                        return <TradingOptions key={index}>面交</TradingOptions>
                      if (item === '7-11')
                        return (
                          <TradingOptions key={index}>
                            7-11 店到店
                          </TradingOptions>
                        )
                      if (item === '全家')
                        return (
                          <TradingOptions key={index}>
                            全家 店到店
                          </TradingOptions>
                        )
                      return false
                    })}
                </Label>
              </GiftItems>
            </GiftDetail>

            {/* 判斷是否為發文者，顯示不同的按鈕 */}
            {/* 當登入者與發文者為同一人時,顯示 "編輯禮物" 按鈕,否則顯示 "想要禮物" 按鈕 */}
            {/* 當交易的數量總和已達到上限， "想要禮物" 按鈕變成 "贈送中"，且顯示 disabled，不讓索取者提出新索取*/}
            {user && post.author && user.id === post.author._id ? (
              post.isGoal ? (
                <HandleGiftButton disabled={post.isGoal}>
                  編輯禮物
                </HandleGiftButton>
              ) : (
                <HandleGiftButton as={Link} to={`/givings/edit/${post.id}`}>
                  編輯禮物
                </HandleGiftButton>
              )
            ) : user ? (
              <HandleGiftButton
                onClick={() => alertIsAllowMessage(post.id)}
                disabled={post.isDealLimit}
              >
                {post.isGoal
                  ? '已送出'
                  : post.isDealLimit
                  ? '物品贈送中'
                  : '想要禮物'}
              </HandleGiftButton>
            ) : post.isDealLimit ? (
              <HandleGiftButton disabled={post.isDealLimit}>
                {post.isGoal
                  ? '已送出'
                  : post.isDealLimit
                  ? '物品贈送中'
                  : '想要禮物'}
              </HandleGiftButton>
            ) : (
              <HandleGiftButton
                as={Link}
                to="/login"
                disabled={post.isDealLimit}
              >
                想要禮物
              </HandleGiftButton>
            )}
          </DetailRight>
        </GiftDetails>

        <GiftContent>
          {/* 禮物詳情頁的 "物品介紹" 區塊 */}
          <GiftIntro>
            {/* 物品介紹的標題 */}
            <IntroTitle>物品介紹 </IntroTitle>
            {/* 物品介紹的內文 */}
            <IntroContent>
              {/* todo: 顯示輸入的文字格式及樣式 */}
              {post.description}
            </IntroContent>
          </GiftIntro>

          {/* 禮物詳情頁的 "想要禮物" 區塊 */}
          <GiftIntro>
            {/* 想要禮物的標題 */}
            <IntroTitle style={{ marginBottom: '20px' }}>想要禮物</IntroTitle>
            {/* 想要禮物的內文 */}
            {/* 留言內容 */}
            {post.author && (
              <Comments
                isApplyMessage={true}
                post={post}
                setPost={setPost}
                postMessageId={post.id}
                postAuthorId={post.author._id}
                postIsGoal={post.isGoal}
                isDealLimit={isDealLimit}
                setIsDealLimit={setIsDealLimit}
                wantPopUp={wantPopUp}
                handleToggleWantPopUp={handleToggleWantPopUp}
              ></Comments>
            )}
          </GiftIntro>

          {/* 禮物詳情頁的 "留言" 區塊 */}
          <GiftIntro>
            {/* 留言的標題 */}
            <IntroTitle style={{ marginBottom: '20px' }}>留言</IntroTitle>

            {/* 顯示留言內容 */}
            <Comments
              isApplyMessage={false}
              postMessageId={post.id}
              postIsGoal={post.isGoal}
              post={post}
              addNewComment={true}
            ></Comments>
          </GiftIntro>
        </GiftContent>
      </Container>
    </>
  )
}
