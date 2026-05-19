import ollama

def generate_content(prompt):

    response = ollama.chat(

        model="phi3",

        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]

    )

    return response["message"]["content"]