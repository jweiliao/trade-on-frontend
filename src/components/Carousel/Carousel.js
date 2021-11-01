import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// 引入 slick carousel
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// 引入 react slick
import Slider from 'react-slick'

// 引入 Carousel.css
import './Carousel.css'

function Carousel() {
  // 建立 recommended 的 state，儲存到時候後端傳來的推薦物品資料
  const [recommended, setRecommended] = useState([])

  // 第一次進入頁面時，撈後端資料，並帶入 recommended 的 state
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setRecommended(data)
      })
  }, [])

  // 設定 carousel 的參數
  let settings = {
    dots: true,
    infinite: true,
    speed: 100,
    // 幻燈片顯示幾張
    slidesToShow: 4,
    // 幻燈片每次滑動幾張
    slidesToScroll: 1,
    // 兩側是否有箭頭
    arrows: true,
    autoplay: true,

    // 設定 carousel 的 RWD
    responsive: [
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 3, infinite: false },
      },
    ],
  }
  return (
    <div className="container">
      {/* 推薦物品的大標題*/}
      <div className="container_title">快來把這些物品索取回家吧</div>
      {/* 推薦物品的數量為 0 時，顯示 Loading...*/}
      {/* 推薦物品的數量不為 0 時，顯示推薦的物品 */}
      {recommended.length === 0 ? (
        <div>
          <span>Loading...</span>
        </div>
      ) : (
        <Slider {...settings}>
          {/* 這邊用 map 撈出 recommended 中每一個推薦物品 */}
          {recommended.map((current) => (
            // cards - 包住所有卡片的元件
            <div className="cards" key={current.id}>
              {/* card - 每一個卡片的內容 */}
              <div className="card">
                {/* 將卡片的連接設為此物品的物品詳細頁*/}
                <Link to={`/givings/${current.id}`}>
                  {/* 圖片 */}
                  <img
                    className="card-img"
                    alt={'recommended object'}
                    src={`https://source.unsplash.com/random/${current.id}`}
                  />
                  {/* 文字內容 */}
                  <div className="card-content">
                    <div className="card-title ">{current.username}</div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  )
}

export default Carousel
