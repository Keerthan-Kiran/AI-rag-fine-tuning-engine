import ReactMarkdown from "react-markdown"
export default function ChatBubble({ message, isUser }) {

  return (

    <div
      className={`flex w-full ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >

      <div
        className={`
          max-w-[72%]
          px-6
          py-4
          rounded-3xl
          shadow-lg
          whitespace-pre-wrap
          leading-7
          text-[15px]

          ${
            isUser
              ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
              : "bg-white text-slate-800"
          }
        `}
      >
      <ReactMarkdown>{message}</ReactMarkdown>
      </div>

    </div>
  )
}