export default function UploadBox({ onUpload }) {

  const handleChange = (e) => {

    const file = e.target.files[0]

    if (file) {
      onUpload(file)
    }
  }

  return (

    <div className="bg-white/80 backdrop-blur-xl rounded-[32px] shadow-xl p-6 border border-white/40">

      <label className="border-2 border-dashed border-blue-300 rounded-3xl h-64 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition-all">

        <div className="text-6xl text-blue-500 mb-4">
          ↑
        </div>

        <h2 className="text-2xl font-bold text-slate-800">
          Upload PDF or TXT
        </h2>

        <p className="text-slate-500 mt-2">
          Drag & drop or click to upload
        </p>

        <input
          type="file"
          className="hidden"
          onChange={handleChange}
        />

      </label>

    </div>
  )
}