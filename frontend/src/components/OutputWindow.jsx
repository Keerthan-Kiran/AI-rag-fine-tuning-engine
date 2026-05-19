import ReactMarkdown from 'react-markdown'

const OutputWindow = ({ output }) => {

  return (

    <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 min-h-[500px]">

      <ReactMarkdown>
        {output}
      </ReactMarkdown>

    </div>
  )
}

export default OutputWindow