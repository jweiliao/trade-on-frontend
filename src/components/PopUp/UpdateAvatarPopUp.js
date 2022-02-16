import React from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import styled from 'styled-components'
import Backdrop from './Backdrop'
import PopUp from './PopUp'
import FileUploader from './FileUploader'
import { PageTitle } from '../heading'
import { Img, ImgCircleWrapper, ImgWrapper } from '../img'
import { SmallButton, GraySmallButton } from '../buttons'
import useAvatar from '../../hooks/useAvatar'

const ModifyArea = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CropImg = styled(ImgWrapper)`
  margin: 1rem auto;
  max-width: 28rem;
`

const PreviewImg = styled(ImgCircleWrapper)`
  width: 8rem;
  height: 8rem;
`

const ConfirmButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`

const CancelButton = styled(GraySmallButton)``

const SubmitButton = styled(SmallButton)`
  margin-left: 1rem;
`

export default function UpdateAvatarPopUp(prop) {
  const {
    imgUploaded,
    previewUrl,
    crop,
    setCrop,
    handleFile,
    handleImageLoaded,
    handleUpdateAvatar,
  } = useAvatar()

  return (
    <>
      <Backdrop onClick={prop.handleToggleAvatarPopUp} />
      <PopUp>
        <PageTitle>編輯大頭照</PageTitle>
        <ModifyArea>
          <FileUploader handleFile={handleFile} />
          <CropImg>
            <ReactCrop
              src={imgUploaded}
              crop={crop}
              onImageLoaded={(img) => handleImageLoaded(img)}
              onChange={(crop) => setCrop(crop)}
              keepSelection
              circularCrop
              imageStyle={{
                width: '100%',
                height: '100%',
              }}
              minWidth={100}
              minHeight={100}
            />
          </CropImg>
          <PreviewImg>
            <Img alt="預覽大頭照" src={previewUrl} />
          </PreviewImg>
        </ModifyArea>
        <ConfirmButtons>
          <CancelButton type="button" onClick={prop.handleToggleAvatarPopUp}>
            取消
          </CancelButton>
          <SubmitButton type="submit" onClick={() => handleUpdateAvatar(prop)}>
            送出
          </SubmitButton>
        </ConfirmButtons>
      </PopUp>
    </>
  )
}
