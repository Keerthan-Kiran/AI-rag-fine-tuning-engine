import ReactMarkdown from "react-markdown"

const ChatBubble = ({ role, content }) => {

  const isUser = role === "user"

  return (

    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >

      <div
        className={`max-w-[75%] rounded-[28px] px-6 py-5 shadow-xl text-[15px] leading-7 ${
          isUser
            ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
            : "bg-white/90 backdrop-blur-xl text-slate-800 border border-white/40"
        }`}
      >

        <ReactMarkdown>
          {content}
        </ReactMarkdown>

      </div>

    </div>
  )
}

export default ChatBubble