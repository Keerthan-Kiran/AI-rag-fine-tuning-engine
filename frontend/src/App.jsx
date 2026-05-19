import { useState } from "react"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import UploadBox from "./components/UploadBox"
import ContextPreview from "./components/ContextPreview"
import ChatBubble from "./components/ChatBubble"

function App() {

  const [messages, setMessages] = useState([])

  const [input, setInput] = useState("")

  const [tone, setTone] = useState("")
  const [audience, setAudience] = useState("")
  const [intent, setIntent] = useState("")
  const [theme, setTheme] = useState("")

  const [typing, setTyping] = useState(false)

  const [retrievedContext, setRetrievedContext] = useState("")

  const [uploadedFiles, setUploadedFiles] = useState([])

  const handleUpload = async (file) => {

    const formData = new FormData()
    formData.append("file", file)

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/upload",
        {
          method: "POST",
          body: formData,
        }
      )

      if (response.ok) {

        // SHOW FILE IN UI
        setUploadedFiles((prev) => [...prev, file.name])

        // RETRIEVE CONTEXT
        const contextResponse = await fetch(
          "http://127.0.0.1:8000/retrieve-context",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              query: "document summary",
            }),
          }
        )

        const contextData = await contextResponse.json()

        setRetrievedContext(
          contextData.context.join("\n\n")
        )

      } else {

        alert("Upload failed")
      }

    } catch (error) {

      console.error(error)
      alert("Upload error")
    }
  }

  const handleGenerate = async () => {

    if (!input.trim()) return

    // SAVE INPUT BEFORE CLEARING
    const currentInput = input

    // CLEAR INPUT IMMEDIATELY
    setInput("")

    // USER MESSAGE
    const userMessage = {
      role: "user",
      content: currentInput,
    }

    setMessages((prev) => [...prev, userMessage])

    setTyping(true)

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/generate",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            raw_content: currentInput,
            tone,
            audience,
            intent,
            theme,
          }),
        }
      )

      const data = await response.text()

      console.log(data)

      setTyping(false)

      // DELAY FOR NATURAL AI EFFECT
      setTimeout(() => {

        const aiMessage = {
          role: "assistant",
          content: String(data),
        }

        setMessages((prev) => [...prev, aiMessage])

      }, 500)

    } catch (error) {

      console.error(error)

      setTyping(false)
    }
  }

  return (

    <div className="h-screen flex">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Header />

        <div className="flex flex-1 overflow-hidden">

          {/* CENTER */}

          <div className="flex-1 flex flex-col p-8 overflow-hidden">

            {/* CHAT AREA */}

            <div className="flex-1 overflow-y-auto space-y-6 pr-4">

              {messages.length === 0 && (

                <div className="h-full flex items-center justify-center">

                  <div className="text-center">

                    <h2 className="text-5xl font-bold text-slate-800 mb-5">
                      ✨ What would you like to refine today?
                    </h2>

                    <p className="text-slate-500 text-xl">
                      Upload knowledge context and generate
                      enterprise-grade AI content
                    </p>

                  </div>

                </div>
              )}

              {messages.map((msg, index) => (

                <ChatBubble
                  key={index}
                  message={msg.content}
                  isUser={msg.role === "user"}
                />
              ))}

              {/* TYPING EFFECT */}

              {typing && (

                <div className="flex items-center gap-3 ml-2">

                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                    AI
                  </div>

                  <div className="bg-white px-6 py-4 rounded-3xl shadow-md flex gap-2">

                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>

                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>

                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>

                  </div>

                </div>
              )}

            </div>

            {/* INPUT AREA */}

            <div className="mt-6 bg-white/80 backdrop-blur-xl rounded-[32px] shadow-2xl border border-white/40 p-7 space-y-5">

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste AI-generated content..."
                className="w-full h-40 border border-slate-200 rounded-3xl p-5 focus:outline-none focus:ring-4 focus:ring-blue-200 bg-slate-50 text-lg resize-none"
              />

              <div className="grid grid-cols-4 gap-4">

                <input
                  placeholder="Tone"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="border border-slate-200 rounded-2xl p-4 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-200"
                />

                <input
                  placeholder="Audience"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="border border-slate-200 rounded-2xl p-4 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-200"
                />

                <input
                  placeholder="Intent"
                  value={intent}
                  onChange={(e) => setIntent(e.target.value)}
                  className="border border-slate-200 rounded-2xl p-4 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-200"
                />

                <input
                  placeholder="Theme"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="border border-slate-200 rounded-2xl p-4 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-200"
                />

              </div>

              <button
                onClick={handleGenerate}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-[1.02] transition-all duration-300 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl"
              >
                Generate Refined Content
              </button>

            </div>

          </div>

          {/* RIGHT PANEL */}

          <div className="w-[360px] p-6 border-l border-gray-200 bg-white/40 backdrop-blur-xl overflow-y-auto space-y-6">

            <UploadBox onUpload={handleUpload} />

            {/* UPLOADED FILES */}

            <div className="bg-white/80 backdrop-blur-xl rounded-[32px] shadow-xl p-6 border border-white/40">

              <h3 className="text-xl font-bold mb-4">
                Uploaded Documents
              </h3>

              <div className="space-y-3">

                {uploadedFiles.length === 0 && (

                  <p className="text-slate-500 text-sm">
                    No files uploaded yet
                  </p>
                )}

                {uploadedFiles.map((file, index) => (

                  <div
                    key={index}
                    className="bg-slate-100 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700"
                  >
                    📄 {file}
                  </div>
                ))}

              </div>

            </div>

            <ContextPreview context={retrievedContext} />

          </div>

        </div>

      </div>

    </div>
  )
}

export default App