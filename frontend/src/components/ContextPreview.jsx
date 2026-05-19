export default function ContextPreview({ context }) {

  return (

    <div className="bg-white/80 backdrop-blur-xl rounded-[32px] shadow-xl p-6 border border-white/40 h-[280px] overflow-y-auto">

      <h3 className="text-xl font-bold mb-4">
        Retrieved Context
      </h3>

      {context ? (

        <div className="text-slate-700 whitespace-pre-wrap leading-7 text-sm">
          {context}
        </div>

      ) : (

        <p className="text-slate-400 text-sm">
          Uploaded document context will appear here...
        </p>

      )}

    </div>
  )
}