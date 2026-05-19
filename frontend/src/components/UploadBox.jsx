import axios from "axios"
import { FiUploadCloud } from "react-icons/fi"
import toast from "react-hot-toast"

const UploadBox = () => {

  const handleUpload = async (e) => {

    const file = e.target.files[0]

    const formData = new FormData()

    formData.append("file", file)

    try {

      await axios.post(
        "http://localhost:8000/upload",
        formData
      )

      toast.success("Document uploaded successfully")

    } catch (err) {

      toast.error("Upload failed")
    }
  }

  return (

    <label className="border-2 border-dashed border-blue-300 bg-white/70 backdrop-blur-xl rounded-[32px] p-10 flex flex-col items-center justify-center cursor-pointer hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">

      <FiUploadCloud className="text-5xl text-blue-500 mb-4" />

      <h3 className="text-lg font-semibold">
        Upload PDF or TXT
      </h3>

      <p className="text-gray-500 mt-2 text-sm">
        Drag & drop or click to upload
      </p>

      <input
        type="file"
        className="hidden"
        onChange={handleUpload}
      />

    </label>
  )
}

export default UploadBox