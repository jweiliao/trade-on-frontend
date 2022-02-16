import React, { useState, useEffect } from 'react'

import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

export default function ImageSlides({ post }) {
  // 設定帶入的資料
  const [images, setImages] = useState([])
  // 撈 post 的 imgUrls 資料，
  useEffect(() => {
    if (post && post.imgUrls) {
      // imgUrls 資料帶入 recommended 的 state
      setImages(post.imgUrls)
    }
  }, [post])

  return (
    <Carousel showStatus={false} showIndicators={false} dynamicHeight={false}>
      {images.map((current, index) => (
        /* 圖片 */
        <div className="main-slide" key={index}>
          <img alt={'img'} src={current.imgUrl} />
        </div>
      ))}
    </Carousel>
  )
}
