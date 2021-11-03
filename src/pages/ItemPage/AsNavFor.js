import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// 引入 react slick
import Slider from 'react-slick'
// 引入 slick carousel
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// 引入 AsNavFor.css
import './AsNavFor.css'

export default function AsNavFor() {
  const [nav1, setNav1] = useState([])
  const [nav2, setNav2] = useState([])
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
    <div className="sliders-wrap">
      <Slider
        className="sliders"
        asNavFor={nav2}
        ref={(slider1) => setNav1(slider1)}
        arrows={false}
        speed={1000}
      >
        {/* 這邊用 map 撈出recommended 中每一個推薦物品 */}
        {recommended.map((current) => (
          // cards - 包住所有卡片的元件
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
      <Slider
        className="thumbnail_sliders"
        asNavFor={nav1}
        ref={(slider2) => setNav2(slider2)}
        slidesToShow={3}
        swipeToSlide={true}
        focusOnSelect={true}
        arrows={false}
        speed={1000}
      >
        {/* 這邊用 map 撈出recommended 中每一個推薦物品 */}
        {recommended.map((current) => (
          // cards - 包住所有卡片的元件
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
