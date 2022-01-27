import React from 'react'
import styled from 'styled-components'
import { InputLabel, InputErrorMessage } from '../../components/textField'
import { Img, ImgWrapper } from '../../components/img'
import { FaTrashAlt } from 'react-icons/fa'
import ImageUploading from 'react-images-uploading'

const Title = styled(InputLabel)``

const Imgs = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1.2rem;
`

const ImgContainer = styled(ImgWrapper)`
  width: 10rem;
  height: 10rem;
  margin-right: 1rem;
  margin-bottom: 1.2rem;
`

const DeleteBtn = styled.button`
  position: absolute;
  bottom: 0;
  width: 100%;
  border: none;
  padding: 0.5rem 0;
  cursor: pointer;
  opacity: 0.4;
  :hover {
    opacity: 0.7;
  }
`

const DropUpdate = styled.div`
  width: 10rem;
  height: 10rem;
  border: 4px dotted
    ${({ isDragging }) => {
      return isDragging
        ? (props) => props.theme.general_500
        : (props) => props.theme.general_300
    }};
  border-radius: 0.25rem;
  color: ${({ isDragging }) => {
    return isDragging
      ? (props) => props.theme.general_500
      : (props) => props.theme.general_300
  }};
  line-height: 1.5;
  cursor: pointer;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
`

const ErrorMessage = styled(InputErrorMessage)``

export const ImageUpload = (props) => {
  return (
    <>
      <Title>物品圖片</Title>
      <ImageUploading
        multiple
        dataURLKey="imgUrl"
        value={props.images}
        acceptType={props.acceptImagesType}
        maxNumber={props.maxImagesNumber}
        maxFileSize={props.maxFileSize}
        onChange={props.handleImagesChange}
        onError={props.handleImagesError}
      >
        {({ onImageUpload, onImageRemove, dragProps, isDragging }) => (
          <>
            <Imgs>
              {props.images.map((image, index) => (
                <ImgContainer key={index}>
                  <Img src={image.imgUrl} alt="物品圖片" />
                  <DeleteBtn
                    type="button"
                    onClick={() => {
                      onImageRemove(index)
                    }}
                  >
                    <FaTrashAlt />
                  </DeleteBtn>
                </ImgContainer>
              ))}
              {props.images.length < props.maxImagesNumber && (
                <DropUpdate
                  isDragging={isDragging}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  點擊或拖放
                </DropUpdate>
              )}
            </Imgs>
            <ErrorMessage>{props.imageErrorMessage}</ErrorMessage>
          </>
        )}
      </ImageUploading>
    </>
  )
}
