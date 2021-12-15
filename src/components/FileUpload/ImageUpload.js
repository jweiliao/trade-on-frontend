import React, { useCallback, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import ImageUploading from 'react-images-uploading'
import axios from 'axios'
import { renderSize } from '../../utils'

const DrpoUpdate = styled.div`
  width: 100%;
  border: 4px dotted #aaa;
  cursor: pointer;
  text-align: center;
  padding: 40px;
  margin: 20px 0;
`
const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const Imgs = styled.div``
const ImgWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const Img = styled.div`
  width: 10rem;
  height: 10rem;
  position: relative;
  border: 0.1rem solid ${(props) => props.theme.secondary};
  border-radius: 0.25rem;
  margin: 1rem 1rem 0 0;
`
const Pic = styled.img`
  max-height: 100%;
  max-width: 100%;
  width: auto;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`

export const ImageUpload = (props) => {
  const [images, setImages] = useState([])
  const [imgUrl, setImgUrl] = useState([])
  const [error, setError] = useState(null)
  const [deleteId, setDeleteId] = useState([])
  const maxNumber = 5
  const acceptType = ['jpg', 'gif', 'png']
  let arr = []

  const onError = useCallback(
    (errors, files) => {
      console.log(errors, files)
      setError(`檔案格式限制 ${acceptType}`)
    },
    [error]
  )
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex)
    setImages(imageList)

    if (!addUpdateIndex) {
      return
    }

    imageList.forEach((item) => {
      let { data_url } = item
      let { file } = item
      // console.log(data_url)
      setError(null)
      const albumId = 'GG8ZMKb'
      const token = 'b23339c66ad5d10577964b20a0c4b847422a4726'
      let formData = new FormData()
      formData.append(
        'image',
        data_url.replace('data:', '').replace(/^.+,/, '')
      )
      formData.append('title', file.name)
      formData.append('description', renderSize(file.size))
      formData.append('album', albumId)

      const config = {
        method: 'post',
        async: true,
        crossDomain: true,
        processData: false,
        contentType: false,
        url: 'https://api.imgur.com/3/image',
        data: formData,
        headers: {
          Authorization: 'Bearer ' + token,
        },
        mimeType: 'multipart/form-data',
      }

      axios(config)
        .then(function ({ data }) {
          // console.log(JSON.stringify(response.data))
          const {
            data: { link, deletehash },
          } = data
          setDeleteId((preHash) => [...preHash, deletehash])
          setImgUrl((oldImgUrl) => [...oldImgUrl, link])
          arr.push(link)
          // props.func(arr)
        })
        .catch(function (error) {
          console.log(error)
        })
    })
    // props.func({ arr })
  }
  const deleteImage = (index) => {
    console.log(index)
    setDeleteId((preHash) =>
      preHash.filter((hash) => preHash[hash] != preHash[index])
    )
    setImgUrl((oldImgUrl) =>
      oldImgUrl.filter((link) => oldImgUrl[link] != oldImgUrl[index])
    )
    console.log(imgUrl)
    const token = 'b23339c66ad5d10577964b20a0c4b847422a4726'
    const config = {
      method: 'delete',
      async: true,
      crossDomain: true,
      processData: false,
      contentType: false,
      url: `https://api.imgur.com/3/image/${deleteId[index]}`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
      mimeType: 'multipart/form-data',
    }

    axios(config)
      .then(function (res) {
        console.log(res)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const uploadFile = (image) => {
    let { data_url } = image
    let { file } = image
    setError(null)
    const albumId = 'GG8ZMKb'
    const token = 'b23339c66ad5d10577964b20a0c4b847422a4726'
    let formData = new FormData()
    formData.append('image', data_url.replace('data:', '').replace(/^.+,/, ''))
    formData.append('title', file.name)
    formData.append('description', renderSize(file.size))
    formData.append('album', albumId)
    const config = {
      method: 'post',
      async: true,
      crossDomain: true,
      processData: false,
      contentType: false,
      url: 'https://api.imgur.com/3/image',
      data: formData,
      headers: {
        Authorization: 'Bearer ' + token,
      },
      mimeType: 'multipart/form-data',
    }
    axios(config)
      .then(function ({ data }) {
        // console.log(JSON.stringify(response.data))
        const {
          data: { link, deletehash },
        } = data
        setDeleteId((preHash) => [...preHash, deletehash])
        // setImgUrl((oldImgUrl) => [...oldImgUrl, data.data.link])
        // arr.push(data.data.link)
        // props.func(arr)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  useEffect(() => {
    console.log(deleteId)
    props.func(imgUrl)
  }, [imgUrl, deleteId])

  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      onError={onError}
      maxNumber={maxNumber}
      acceptType={acceptType}
      dataURLKey="data_url"
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        // write your building UI
        <div className="upload__image-wrapper">
          <DrpoUpdate
            style={isDragging ? { color: 'red' } : null}
            onClick={onImageUpload}
            {...dragProps}
          >
            點擊或拖曳檔案到此 (檔案格式支援 jpg, gif, png)
          </DrpoUpdate>
          {/* <button type="button" onClick={onImageRemoveAll}>
            Remove all images
          </button> */}
          {error}
          <Flex>
            {imageList.map((image, index) => (
              <Imgs key={index} className="image-item">
                <ImgWrapper>
                  <Img>
                    <Pic src={image.data_url} alt="" width="100" />
                  </Img>
                </ImgWrapper>
                <button type="button" onClick={() => onImageUpdate(index)}>
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onImageRemove(index)
                    deleteImage(index)
                  }}
                >
                  Remove
                </button>
              </Imgs>
            ))}
          </Flex>
        </div>
      )}
    </ImageUploading>
  )
}
