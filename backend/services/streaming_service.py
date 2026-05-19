import ollama


def stream_response(prompt):
    stream = ollama.chat(
        model="mistral",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        stream=True
    )

    for chunk in stream:
        yield chunk["message"]["content"]