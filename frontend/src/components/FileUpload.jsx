import axios from 'axios'

const FileUpload = () => {

  const handleUpload = async (e) => {

    const file = e.target.files[0]

    const formData = new FormData()

    formData.append('file', file)

    await axios.post(
      'http://localhost:8000/upload',
      formData
    )

    alert('Upload successful')
  }

  return (

    <div className="bg-slate-900 p-5 rounded-xl border border-slate-700">

      <input
        type="file"
        onChange={handleUpload}
      />

    </div>
  )
}

export default FileUpload