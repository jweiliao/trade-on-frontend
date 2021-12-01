import React, { useCallback, useState } from 'react'
import ReactDOM from 'react-dom'
import ImageUploading from 'react-images-uploading'
import axios from 'axios'
import { renderSize } from '../../utils'

export const ImageUpload = (props) => {
  const [images, setImages] = useState([])
  const [imgUrl, setImgUrl] = useState([])
  const [error, setError] = useState(null)
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
            data: { link },
          } = data

          setImgUrl((oldImgUrl) => [...oldImgUrl, link])
          arr.push(link)
          // props.func(arr)
        })
        .catch(function (error) {
          console.log(error)
        })
    })
    props.func({ arr })
    // let [{ data_url }] = imageList
    // let [{ file }] = imageList

    // const albumId = 'GG8ZMKb'
    // const token = 'b23339c66ad5d10577964b20a0c4b847422a4726'
    // let formData = new FormData()
    // formData.append('image', data_url.replace('data:', '').replace(/^.+,/, ''))
    // formData.append('title', file.name)
    // formData.append('description', renderSize(file.size))
    // formData.append('album', albumId)

    // const config = {
    //   method: 'post',
    //   async: true,
    //   crossDomain: true,
    //   processData: false,
    //   contentType: false,
    //   url: 'https://api.imgur.com/3/image',
    //   data: formData,
    //   headers: {
    //     Authorization: 'Bearer ' + token,
    //   },
    //   mimeType: 'multipart/form-data',
    // }

    // axios(config)
    //   .then(function ({ data }) {
    //     // console.log(JSON.stringify(response.data))
    //     console.log('response', data.data.link)
    //     setImgUrl(data.data.link)
    //     props.func(imgUrl)
    //   })
    //   .catch(function (error) {
    //     console.log(error)
    //   })
  }
  const deleteFile = (image, index) => {
    console.log(image, index)
  }
  const uploadFile = (image) => {
    // let { data_url } = image
    // let { file } = image
    // setError(null)
    // const albumId = 'GG8ZMKb'
    // const token = 'b23339c66ad5d10577964b20a0c4b847422a4726'
    // let formData = new FormData()
    // formData.append('image', data_url.replace('data:', '').replace(/^.+,/, ''))
    // formData.append('title', file.name)
    // formData.append('description', renderSize(file.size))
    // formData.append('album', albumId)
    // const config = {
    //   method: 'post',
    //   async: true,
    //   crossDomain: true,
    //   processData: false,
    //   contentType: false,
    //   url: 'https://api.imgur.com/3/image',
    //   data: formData,
    //   headers: {
    //     Authorization: 'Bearer ' + token,
    //   },
    //   mimeType: 'multipart/form-data',
    // }
    // axios(config)
    //   .then(function ({ data }) {
    //     // console.log(JSON.stringify(response.data))
    //     console.log('response', data.data.link)
    //     setImgUrl((oldImgUrl) => [...oldImgUrl, data.data.link])
    //     arr.push(data.data.link)
    //     // props.func(arr)
    //   })
    //   .catch(function (error) {
    //     console.log(error)
    //   })
  }

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
          <button
            type="button"
            style={isDragging ? { color: 'red' } : null}
            onClick={onImageUpload}
            {...dragProps}
          >
            Click or Drop here
          </button>
          &nbsp;
          <button type="button" onClick={onImageRemoveAll}>
            Remove all images
          </button>
          {error}
          {imageList.map((image, index) => (
            <div key={index} className="image-item">
              <img
                src={image.data_url}
                alt=""
                width="100"
                href={image.data_url}
              />
              <div className="image-item__btn-wrapper">
                <button type="button" onClick={() => onImageUpdate(index)}>
                  Update
                </button>
                <button type="button" onClick={() => onImageRemove(index)}>
                  Remove
                </button>
                <button type="button" onClick={() => uploadFile(image)}>
                  上傳檔案
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </ImageUploading>
  )
}
