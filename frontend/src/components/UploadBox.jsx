import { FiUploadCloud } from "react-icons/fi"

const UploadBox = ({ onUpload }) => {

  const handleFile = (e) => {

    const file = e.target.files[0]

    if (file) {
      onUpload(file)
    }
  }

  return (

    <label className="border-2 border-dashed border-blue-300 bg-white/70 backdrop-blur-xl rounded-[32px] p-10 flex flex-col items-center justify-center cursor-pointer hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">

      <FiUploadCloud className="text-6xl text-blue-500 mb-4" />

      <h2 className="text-2xl font-bold text-slate-800">
        Upload PDF or TXT
      </h2>

      <p className="text-slate-500 mt-2">
        Drag & drop or click to upload
      </p>

      <input
        type="file"
        className="hidden"
        onChange={handleFile}
      />

    </label>
  )
}

export default UploadBox