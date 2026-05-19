def build_prompt(raw_content, tone, audience, intent, theme, context):
    prompt = f"""
Tone: {tone}
Audience: {audience}
Intent: {intent}
Theme: {theme}

Retrieved Context:
{context}

Original Content:
{raw_content}

Now refine the content professionally.
"""

    return prompt