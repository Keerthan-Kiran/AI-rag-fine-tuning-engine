const PromptPanel = ({ formData, setFormData }) => {

  return (

    <div className="space-y-4">

      <input
        className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700"
        placeholder="Tone"
        onChange={(e) =>
          setFormData({
            ...formData,
            tone: e.target.value
          })
        }
      />

      <input
        className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700"
        placeholder="Audience"
        onChange={(e) =>
          setFormData({
            ...formData,
            audience: e.target.value
          })
        }
      />

      <input
        className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700"
        placeholder="Intent"
        onChange={(e) =>
          setFormData({
            ...formData,
            intent: e.target.value
          })
        }
      />

      <input
        className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700"
        placeholder="Theme"
        onChange={(e) =>
          setFormData({
            ...formData,
            theme: e.target.value
          })
        }
      />

    </div>
  )
}

export default PromptPanel