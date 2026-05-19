import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"

import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import UploadBox from "./components/UploadBox"
import ChatBubble from "./components/ChatBubble"
import TypingLoader from "./components/TypingLoader"
import ContextPreview from "./components/ContextPreview"

function App() {

  const [messages, setMessages] = useState([])

  const [loading, setLoading] = useState(false)

  const [contexts, setContexts] = useState([])

  const [formData, setFormData] = useState({
    raw_content: "",
    tone: "",
    audience: "",
    intent: "",
    theme: ""
  })

  const generateContent = async () => {

    if (!formData.raw_content) {
      toast.error("Please enter content")
      return
    }

    setLoading(true)

    setMessages(prev => [
      ...prev,
      {
        role: "user",
        content: formData.raw_content
      }
    ])

    // Retrieve context
    const retrievalResponse = await fetch(
      "http://localhost:8000/retrieve-context",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: formData.raw_content
        })
      }
    )

    const retrievalData = await retrievalResponse.json()

    setContexts(retrievalData.context)

    // Generate AI response
    const response = await fetch(
      "http://localhost:8000/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }
    )

    const reader = response.body.getReader()

    const decoder = new TextDecoder()

    let aiResponse = ""

    setMessages(prev => [
      ...prev,
      {
        role: "assistant",
        content: ""
      }
    ])

    while (true) {

      const { done, value } = await reader.read()

      if (done) break

      const chunk = decoder.decode(value)

      aiResponse += chunk

      setMessages(prev => {

        const updated = [...prev]

        updated[updated.length - 1].content = aiResponse

        return updated
      })
    }

    setLoading(false)
  }

  return (

    <div className="flex h-screen">

      <Toaster />

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Header />

        <div className="flex flex-1 overflow-hidden">

          {/* Chat Section */}
          <div className="flex-1 flex flex-col p-8 overflow-hidden">

            <div className="flex-1 overflow-y-auto space-y-8 pr-6 py-4">

              {messages.map((msg, index) => (

                <ChatBubble
                  key={index}
                  role={msg.role}
                  content={msg.content}
                />

              ))}

              {loading && <TypingLoader />}

            </div>

            <div className="mt-8 bg-white/80 backdrop-blur-xl rounded-[32px] shadow-2xl border border-white/40 p-7 space-y-5">

              <textarea
                className="w-full h-40 border border-slate-200 rounded-3xl p-5 focus:outline-none focus:ring-4 focus:ring-blue-200 bg-slate-50 text-lg resize-none"
                placeholder="Paste AI-generated content..."
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    raw_content: e.target.value
                  })
                }
              />

              <div className="grid grid-cols-4 gap-4">

                <input
                  className="border border-slate-200 rounded-2xl p-4 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-200"
                  placeholder="Tone"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tone: e.target.value
                    })
                  }
                />

                <input
                  className="border border-slate-200 rounded-2xl p-4 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-200"
                  placeholder="Audience"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      audience: e.target.value
                    })
                  }
                />

                <input
                  className="border border-slate-200 rounded-2xl p-4 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-200"
                  placeholder="Intent"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      intent: e.target.value
                    })
                  }
                />

                <input
                  className="border border-slate-200 rounded-2xl p-4 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-200"
                  placeholder="Theme"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      theme: e.target.value
                    })
                  }
                />

              </div>

              <button
                onClick={generateContent}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-[1.02] transition-all duration-300 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl"
              >
                Generate Refined Content
              </button>

            </div>

          </div>

          {/* Right Panel */}
          <div className="w-[380px] bg-gray-50 border-l border-gray-200 p-6 overflow-y-auto space-y-6">

            <UploadBox />

            <ContextPreview contexts={contexts} />

          </div>

        </div>

      </div>

    </div>
  )
}

export default App