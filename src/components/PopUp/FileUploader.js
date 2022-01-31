import React from 'react'
import styled from 'styled-components'
import { SmallButton } from '../buttons'

const ChooseImgButton = styled(SmallButton)``

const InputFile = styled.input.attrs({ type: 'file' })`
  display: none;
`

const FileUploader = (props) => {
  const hiddenFileInput = React.useRef(null)
  const handleClick = () => {
    hiddenFileInput.current.click()
  }
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0]
    props.handleFile(fileUploaded)
  }

  return (
    <>
      <ChooseImgButton onClick={handleClick}>選擇圖片</ChooseImgButton>
      <InputFile
        accept="image/gif, image/jpeg, image/png"
        ref={hiddenFileInput}
        onChange={handleChange}
      />
    </>
  )
}

export default FileUploader
