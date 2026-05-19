const ContextPreview = ({ contexts }) => {

  return (

    <div className="bg-white/80 backdrop-blur-xl rounded-[32px] shadow-xl p-6 border border-white/40">

      <h3 className="font-semibold mb-4">
        Retrieved Context
      </h3>

      <div className="space-y-3 max-h-[300px] overflow-y-auto">

        {contexts.map((ctx, index) => (

          <div
            key={index}
            className="bg-gray-50 p-3 rounded-xl text-sm text-gray-700"
          >
            {ctx}
          </div>

        ))}

      </div>

    </div>
  )
}

export default ContextPreview