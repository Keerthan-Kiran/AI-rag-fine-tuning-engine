import {
  FiFileText,
  FiZap,
  FiDatabase
} from "react-icons/fi"

const Sidebar = () => {

  return (

    <div className="w-[290px] bg-white/70 backdrop-blur-xl border-r border-white/30 h-screen p-7 flex flex-col shadow-xl">

      <div>

        <div className="flex items-center gap-3 mb-12">

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
            AI
          </div>

          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              RAG Engine
            </h1>

            <p className="text-sm text-slate-500">
              Intelligent Refinement
            </p>

          </div>

        </div>

        <div className="space-y-4">

          <div className="flex items-center gap-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-2xl shadow-lg cursor-pointer hover:scale-[1.02] transition">

            <FiZap className="text-xl" />

            <span className="font-medium">
              Content Refinement
            </span>

          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl text-slate-600 hover:bg-slate-100 transition cursor-pointer">

            <FiDatabase className="text-xl" />

            <span>
              Retrieval Context
            </span>

          </div>

        </div>

      </div>

      <div className="mt-auto">

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">

          <p className="text-sm text-slate-500 mb-2">
            Powered by
          </p>

          <div className="flex items-center gap-2 text-slate-700 font-medium">
            <FiFileText />
            Ollama + RAG Pipeline
          </div>

        </div>

      </div>

    </div>
  )
}

export default Sidebar