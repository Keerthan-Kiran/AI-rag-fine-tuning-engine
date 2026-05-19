const ContextPreview = ({ context = [] }) => {

  return (

    <div className="bg-white rounded-3xl shadow-xl p-6 h-[260px] overflow-y-auto">

      <h2 className="text-xl font-semibold text-slate-800 mb-4">
        Retrieved Context
      </h2>

      {context.length === 0 ? (

        <div className="text-slate-400 text-sm">
          Uploaded document context will appear here...
        </div>

      ) : (

        <div className="space-y-4">

          {context.map((item, index) => (

            <div
              key={index}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-700 leading-6"
            >
              {item}
            </div>

          ))}

        </div>

      )}

    </div>
  )
}

export default ContextPreview