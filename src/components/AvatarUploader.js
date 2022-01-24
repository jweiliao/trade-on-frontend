import React, { useState, useRef, useContext, useEffect } from 'react'
import styled from 'styled-components'
import Container from './Container'
import { PageTitle } from './heading'
import { SmallButton } from './buttons'
import Swal from 'sweetalert2'
import { MEDIA_QUERY_SM } from '../styles/breakpoints'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import AuthContext from '../contexts'
import { getMe, updateAvatar } from '../WebAPI'

/* 彈窗出現時的遮罩背景 */
const BackDrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 50;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
`

/* 彈窗的整個區塊 */
const UpdatePwWrapper = styled.div`
  z-index: 100;
  width: 500px;
  padding: 2.5rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid ${(props) => props.theme.general_500};
  border-radius: 0.25rem;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  transition: all 0.5s ease-out;
  ${MEDIA_QUERY_SM} {
    margin-top: 20px;
    max-width: 80%;
  }
`

/* 標題 */
const Title = styled(PageTitle)``

/* 與輸入框有關的整個區塊 */
const ModifyPw = styled.div`
  max-width: 100%;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // padding-left: 30px;
  font-size: 20px;
  margin-bottom: 30px;
`

/* 所有按鈕操作的整個區塊 */
const PwConfirmWrapper = styled.div`
  display: flex;
  justify-content: center;
  ${MEDIA_QUERY_SM} {
    flex-direction: column;
    align-items: center;
  }
`

/* "取消" 按鈕 */
const PwCancelButton = styled(SmallButton)`
  background-color: ${(props) => props.theme.general_200};
  &:hover {
    background-color: ${(props) => props.theme.general_300};
  }
  ${MEDIA_QUERY_SM} {
    width: 100%;
  }
`

/* "更新密碼" 按鈕 */
const PwUpdateButton = styled(SmallButton)`
  margin-left: 27px;
  ${MEDIA_QUERY_SM} {
    width: 100%;
    margin-top: 20px;
    margin-left: 0px;
  }
`

const PreviewImg = styled.div`
  background: #fff;
  max-width: 100px;
  max-height: 100px;
  margin: 15px;
  border-radius: 50%;
  overflow: hidden;
  & img {
    width: 100%;
  }
`

// 將從父層傳入的 setPwPopUp、closeModal 這些 props 帶入
export default function UpdatePortfolioPw({ AvPwPopUp, closeModal }) {
  const {
    setUser,
    user: { avatarUrl, id },
  } = useContext(AuthContext)
  // 當點擊 "更新" 的按鈕時，執行 handleUpdate
  const [imageUrl, setImageUrl] = useState(null)
  // const [avatar, setAvatar] = useState(avatarUrl)
  const handleUpdate = () => {
    let avatarLink = new FormData()
    avatarLink.append('imageUrl', imageUrl)

    updateAvatar(id, avatarLink)
      .then((res) => {
        const { data } = res
        if (data.message === 'success') {
          AvPwPopUp(false)
          Swal.fire('圖片上傳', '更新成功', 'success')
          const fetchUser = async () => {
            try {
              const { data } = await getMe()
              console.log(data.userInfo.avatarUrl.imgUrl)
              setUser(data.userInfo)
            } catch (err) {
              console.log(err)
            }
          }
          fetchUser()
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 當點擊 "取消" 的按鈕時，執行 handleCancelClick
  const handleCancelClick = () => {
    // 更新 pwPopUp 的 state 為 false （不顯示設定新密碼的彈窗）
    AvPwPopUp(false)
  }

  // const [imgUrl, setImgUrl] = useState()
  const [upImg, setUpImg] = useState(null)
  const [crop, setCrop] = useState({
    unit: 'px',
    width: 100,
    height: 100,
    aspect: 1,
  })
  const imgRef = useRef()
  const [previewUrl, setPreviewUrl] = useState(avatarUrl && avatarUrl.imgUrl)

  const getBase64 = (image, callback) => {
    try {
      const reader = new FileReader()
      reader.onloadend = () => {
        callback(reader.result)
      }
      reader.readAsDataURL(image)
    } catch (err) {
      console.log('getBase64 err:', err)
    }
  }

  const onSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      let validExts = ['.jpg', '.jpeg', '.png', '.gif']
      let fileExt = event.target.files[0].name
      fileExt = fileExt.substring(fileExt.lastIndexOf('.'))

      if (validExts.indexOf(fileExt) < 0) {
        Swal.fire({
          icon: 'error',
          title: '上傳失敗',
          showConfirmButton: true,
          text:
            '檔案類型錯誤，可接受的副檔名有：' +
            validExts.toString().replace(/,/g, ' '),
        })
        event.target.value = null
        setUpImg(null)
        return false
      }

      getBase64(event.target.files[0], (result) => setUpImg(result))
    }
  }

  const onLoad = (img) => {
    imgRef.current = img

    /** centralize crop into the image */
    const { width, height } = img

    if (width > height) {
      setCrop({
        ...crop,
        width: height,
        height,
        x: width / 2 - height / 2,
        y: 0,
      })
    } else {
      setCrop({
        ...crop,
        width,
        height: width,
        x: 0,
        y: height / 2 - width / 2,
      })
    }

    return false
  }

  /** default image on load (optional) */
  useEffect(() => {
    if (!upImg)
      fetch(previewUrl, { mode: 'cors' })
        .then((response) => response.blob())
        .then((blob) => {
          const reader = new FileReader()
          reader.onloadend = () => setUpImg(reader.result)
          reader.readAsDataURL(blob)
        })
  }, [upImg, previewUrl])

  useEffect(() => {
    const createCropPreview = async (image, crop, fileName) => {
      const canvas = document.createElement('canvas')
      const scaleX = image.naturalWidth / image.width
      const scaleY = image.naturalHeight / image.height

      canvas.width = crop.width
      canvas.height = crop.height

      const ctx = canvas.getContext('2d')

      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      )

      return new Promise((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Canvas is empty'))
              return
            }

            blob.name = fileName
            window.URL.revokeObjectURL(blob) ||
              window.webkitURL.revokeObjectURL(blob)
            // creating a Object URL representing the Blob object given
            setPreviewUrl(
              (window.URL || window.webkitURL).createObjectURL(blob)
            )
            resolve()
          },
          'image/jpeg',
          1
        )
        // setImgUrl(
        //   canvas.toDataURL('image/png').replace('data:', '').replace(/^.+,/, '')
        // )
        const dataURLtoFile = (dataurl, filename) => {
          const arr = dataurl.split(',')
          const mime = arr[0].match(/:(.*?);/)[1]
          const bstr = atob(arr[1])
          let n = bstr.length
          const u8arr = new Uint8Array(n)
          while (n) {
            u8arr[n - 1] = bstr.charCodeAt(n - 1)
            n -= 1 // to make eslint happy
          }
          return new File([u8arr], filename, { type: mime })
        }
        const file = dataURLtoFile(canvas.toDataURL('image/png'))
        setImageUrl(file)
      })
    }

    if (imgRef.current && crop.width && crop.height) {
      createCropPreview(imgRef.current, crop, 'newFile.jpeg')
    }
  }, [crop, imgRef])

  return (
    <>
      {/* 如果 setPwPopUp  的 state 為 true，顯示 BackDrop 遮罩*/}
      {/* 將 closeModal 帶入 BackDrop，設定當出現彈窗時，點擊彈窗外的區塊，會收回彈窗 */}
      {AvPwPopUp && <BackDrop onClick={closeModal}></BackDrop>}
      <Container>
        <UpdatePwWrapper>
          {/* 標題 */}
          <Title>上傳頭像</Title>
          <ModifyPw>
            <>
              <div>
                <input
                  type="file"
                  accept="image/gif, image/jpeg, image/png"
                  onChange={onSelectFile}
                />
              </div>

              <ReactCrop
                src={upImg}
                crop={crop}
                onImageLoaded={(img) => onLoad(img)}
                onChange={(crop) => setCrop(crop)}
                keepSelection
                circularCrop
                imageStyle={{
                  maxWidth: '400px',
                  maxHeight: '400px',
                }}
                minWidth={100}
                minHeight={100}
              />

              {previewUrl && (
                <PreviewImg>
                  <img
                    className="preview"
                    alt="Crop preview"
                    src={previewUrl}
                  />
                </PreviewImg>
              )}
            </>
          </ModifyPw>
          {/* 所有按鈕操作的整個區塊 */}
          <PwConfirmWrapper>
            {/* 點擊 "取消" 的按鈕時，執行 handleCancelClick */}
            <PwCancelButton onClick={handleCancelClick}>取消</PwCancelButton>
            {/* 點擊 "更新密碼" 的按鈕時，執行 handleUpdate */}
            <PwUpdateButton type="submit" onClick={handleUpdate}>
              送出
            </PwUpdateButton>
          </PwConfirmWrapper>
        </UpdatePwWrapper>
      </Container>
    </>
  )
}
