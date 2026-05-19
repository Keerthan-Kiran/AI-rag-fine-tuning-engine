from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from services.retrieval_service import retrieve_context
from services.prompt_service import build_prompt
from services.streaming_service import stream_response

router = APIRouter()


@router.post("/generate")
async def generate(data: dict):
    raw_content = data.get("raw_content")
    tone = data.get("tone")
    audience = data.get("audience")
    intent = data.get("intent")
    theme = data.get("theme")

    retrieved_chunks = retrieve_context(raw_content)

    context = "\n".join(retrieved_chunks)

    prompt = build_prompt(
        raw_content,
        tone,
        audience,
        intent,
        theme,
        context
    )

    return StreamingResponse(
        stream_response(prompt),
        media_type="text/plain"
    )