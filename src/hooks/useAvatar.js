import { useState, useRef, useContext, useEffect } from 'react'
import AuthContext, { LoadingContext } from '../contexts'
import { updateAvatar } from '../WebAPI'
import Swal from 'sweetalert2'

export default function useAvatar() {
  const {
    user: { avatarUrl, id },
    setUser,
  } = useContext(AuthContext)
  const { setIsLoading } = useContext(LoadingContext)
  const imgRef = useRef()
  const [imgUploaded, setImgUploaded] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [crop, setCrop] = useState({
    unit: 'px',
    aspect: 1,
  })

  // default image on load
  useEffect(() => {
    if (!imgUploaded) {
      fetch(avatarUrl && avatarUrl.imgUrl, { mode: 'cors' })
        .then((response) => response.blob())
        .then((blob) => {
          const reader = new FileReader()
          reader.readAsDataURL(blob)
          reader.onloadend = () => setImgUploaded(reader.result)
        })
    }
  }, [avatarUrl, imgUploaded])

  useEffect(() => {
    if (imgRef.current) {
      getCroppedImg(imgRef.current, crop, 'newFile.jpeg').then((blob) => {
        setPreviewUrl((window.URL || window.webkitURL).createObjectURL(blob))
        setImageFile(blobToFile(blob, blob.name))
      })
    }
  }, [crop])

  const handleImageLoaded = (img) => {
    imgRef.current = img

    // set crop center
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

  const handleFile = (fileUploaded) => {
    if (!fileUploaded) return
    const acceptType = ['jpg', 'jpeg', 'png']
    const extension = getExtension(fileUploaded.name)
    if (acceptType.indexOf(extension) < 0) {
      Swal.fire({
        icon: 'error',
        title: '上傳失敗',
        showConfirmButton: true,
        confirmButtonColor: '#B7B7B7',
        confirmButtonText: '關閉',
        text: `格式錯誤，支援的檔案格式為 ${acceptType.join(', ')}`,
      })
      return
    }

    getBase64(fileUploaded, (result) => setImgUploaded(result))
  }

  const handleUpdateAvatar = (prop) => {
    setIsLoading(true)
    let avatarFile = new FormData()
    avatarFile.append('imageUrl', imageFile)
    updateAvatar(id, avatarFile).then((res) => {
      const { data } = res
      if (data.message === 'success') {
        setUser(data.update)
        prop.handleToggleAvatarPopUp()
      }
      setIsLoading(false)
    })
  }

  const getCroppedImg = async (image, crop, fileName) => {
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
          resolve(blob)
        },
        'image/jpeg',
        1
      )
    })
  }

  const blobToFile = (theBlob, fileName) => {
    theBlob.lastModifiedDate = new Date()
    theBlob.name = fileName
    return theBlob
  }

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

  const getExtension = (filename) => {
    return filename.substring(filename.lastIndexOf('.') + 1)
  }

  return {
    imgUploaded,
    previewUrl,
    crop,
    setCrop,
    handleFile,
    handleImageLoaded,
    handleUpdateAvatar,
  }
}
