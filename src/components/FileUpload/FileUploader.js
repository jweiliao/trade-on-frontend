import React, { useState, useCallback, useEffect } from 'react'
import useFileUploader from 'react-uploader-hook'
import { renderSize } from '../../utils'

const FileUploader = (props) => {
  const [dataBase64, setDatabase64] = useState([])
  const [imgUrl, setImgUrl] = useState([])
  const [deleteHash, setDeleteHash] = useState([])
  const getUploadParams = useCallback((file) => {
    convertFile(file)
      .then((data) => {
        setDatabase64((prevData) => [...prevData, data])
      })
      .catch((err) => {
        console.log(err)
      })

    function convertFile(file) {
      return new Promise((resolve, reject) => {
        // 建立FileReader物件
        let reader = new FileReader()
        // 註冊onload事件，取得result則resolve (會是一個Base64字串)
        reader.onload = () => {
          resolve(reader.result)
        }
        // 註冊onerror事件，若發生error則reject
        reader.onerror = () => {
          reject(reader.error)
        }
        // 讀取檔案
        reader.readAsDataURL(file)
      })
    }
    const token = 'b23339c66ad5d10577964b20a0c4b847422a4726'
    const albumId = 'GG8ZMKb'

    const formData = new FormData()
    formData.append('image', file)
    formData.append('title', file.name)
    formData.append('description', renderSize(file.size))
    formData.append('album', albumId)

    return {
      method: 'post',
      url: 'https://api.imgur.com/3/image',
      data: formData,
      meta: { 'any-other-stuff': 'hello' },
      headers: {
        Authorization: 'Bearer ' + token,
      },
      mimeType: 'multipart/form-data',
    }
  }, [])

  const onUploaded = useCallback((fileBag) => {
    const {
      responseData: {
        data: { link, deletehash },
      },
    } = fileBag
    setDeleteHash((prevHash) => [...prevHash, deletehash])
    setImgUrl((prevLink) => [...prevLink, link])
  }, [])

  useEffect(() => {
    // 向上層傳遞參數
    props.func(imgUrl)
  }, [imgUrl])

  // [⭐]
  const { onDrop, fileBags } = useFileUploader({ getUploadParams, onUploaded })

  const handleChange = useCallback(
    (event) => {
      onDrop(event.target.files)
    },
    [onDrop]
  )

  const handleRemoveImg = (hash, index) => {
    console.log(hash)
    imgUrl.splice(index, 1)
  }

  return (
    <div>
      <input type="file" onChange={handleChange} multiple />
      <pre>{JSON.stringify(fileBags, null, 2)}</pre>
      {dataBase64.map((item) => {
        return (
          <>
            <img key={item} src={item} alt="" width="100" />
          </>
        )
      })}
      {deleteHash.map((hash, index) => {
        return (
          <>
            <button type="button" onClick={() => handleRemoveImg(hash, index)}>
              刪除
            </button>
          </>
        )
      })}
    </div>
  )
}

export default FileUploader
