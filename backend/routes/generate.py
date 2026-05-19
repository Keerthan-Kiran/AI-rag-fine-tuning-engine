from fastapi import APIRouter
from pydantic import BaseModel

from services.llm_service import generate_content

router = APIRouter()

class GenerateRequest(BaseModel):

    raw_content: str
    tone: str
    audience: str
    intent: str
    theme: str

@router.post("/generate")
async def generate(data: GenerateRequest):

    prompt = f"""
You are a professional AI content refinement assistant.

Refine the following content professionally.

CONTENT:
{data.raw_content}

TONE:
{data.tone}

AUDIENCE:
{data.audience}

INTENT:
{data.intent}

THEME:
{data.theme}

Requirements:
- Improve readability
- Improve professionalism
- Improve engagement
- Make it human-like
- Keep it concise but impactful
"""

    result = generate_content(prompt)

    return {
        "response": result
    }