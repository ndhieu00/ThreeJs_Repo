
const UploadModel = (props) => {
  const inputRef = useRef(null)

  const handleButtonClick = () => {
    inputRef.current.click()
  }

  return (
    <>
      <input
        ref={inputRef}
        id="file"
        name="avatar"
        type="file"
        accept="image/png, image/jpeg" 
        style={{display: 'none'}}
      />
      <button onClick={handleButtonClick}>Upload File</button>
    </>
  )
}

export default UploadModel