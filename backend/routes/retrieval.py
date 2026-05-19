from fastapi import APIRouter

from services.retrieval_service import retrieve_context

router = APIRouter()


@router.post("/retrieve-context")
async def retrieve(data: dict):
    query = data.get("query")

    context = retrieve_context(query)

    return {
        "context": context
    }