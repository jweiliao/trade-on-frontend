import React, { useState, useEffect } from 'react'

// 引入 react slick
import Slider from 'react-slick'

// 引入 slick carousel
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// 引入 AsNavFor.css
import './AsNavFor.css'

// AsNavFor：上方一張大圖，下方多張小圖的輪播
export default function AsNavFor() {
  // nav1 ： 設定上方大圖的 state
  const [nav1, setNav1] = useState([])
  // nav2 ： 設定下方小圖的 state
  const [nav2, setNav2] = useState([])
  // 設定帶入的資料
  const [recommended, setRecommended] = useState([])

  // 第一次進入頁面時，撈後端資料，並帶入 recommended 的 state
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setRecommended(data)
      })
  }, [])

  return (
    // 輪播圖的整個區塊
    <div className="sliders-wrap">
      {/* 上方大圖 */}
      <Slider
        className="sliders"
        asNavFor={nav2} // 與 nav2 連結
        ref={(slider1) => setNav1(slider1)}
        arrows={false} // 左右是否顯示箭頭
        speed={1000} // 輪播速度
      >
        {/* 這邊用 map 撈出 recommended 中每一個推薦物品 */}
        {recommended.map((current) => (
          // 包住整個大圖的區塊
          <li className="sliders-item" key={current.id}>
            {/* 圖片 */}
            <img
              className="slider-img"
              alt={'object'}
              src={`https://source.unsplash.com/random/${current.id}`}
            />
          </li>
        ))}
      </Slider>

      {/* 下方小圖 */}
      <Slider
        className="thumbnail_sliders"
        asNavFor={nav1} // 與 nav1 連結
        ref={(slider2) => setNav2(slider2)}
        slidesToShow={3} // 每次顯示的圖片
        swipeToSlide={true} // 可以滑動換下一張
        focusOnSelect={true} // 不太確定是什麼
        arrows={false} // 左右是否顯示箭頭
        speed={1000} // 輪播速度
      >
        {/* 這邊用 map 撈出recommended 中每一個推薦物品 */}
        {recommended.map((current) => (
          // 包住整個小圖的區塊
          <li className="thumbnail_sliders-item" key={current.id}>
            {/* 圖片 */}
            <img
              className="thumbnail_slider-img"
              alt={'object'}
              src={`https://source.unsplash.com/random/${current.id}`}
            />
          </li>
        ))}
      </Slider>
    </div>
  )
}
