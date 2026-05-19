const Header = () => {

  return (

    <div className="bg-white/70 backdrop-blur-xl border-b border-white/30 px-10 py-6 flex justify-between items-center shadow-sm">

      <div>

        <h2 className="text-3xl font-bold text-slate-800">
          AI Content Fine-Tuning Engine
        </h2>

        <p className="text-slate-500 mt-2 text-lg">
          Intelligent RAG-powered content refinement platform
        </p>

      </div>

      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-3 rounded-2xl shadow-lg font-medium">
        AI Active
      </div>

    </div>
  )
}

export default Header