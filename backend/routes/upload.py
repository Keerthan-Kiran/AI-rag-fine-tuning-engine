from fastapi import APIRouter, UploadFile, File
import shutil
import os

from utils.file_parser import (
    extract_text_from_pdf,
    extract_text_from_txt
)

from rag.chunking import create_chunks

from services.embedding_service import generate_embeddings

from rag.vector_store import store_embeddings

router = APIRouter()


@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):

    os.makedirs("uploaded_docs", exist_ok=True)

    path = f"uploaded_docs/{file.filename}"

    # Save uploaded file
    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text
    if file.filename.endswith(".pdf"):
        text = extract_text_from_pdf(path)

    elif file.filename.endswith(".txt"):
        text = extract_text_from_txt(path)

    else:
        return {
            "error": "Unsupported file type"
        }

    # DEBUG
    print("Extracted Text Length:", len(text))

    # Validate extraction
    if not text.strip():
        return {
            "error": "No readable text found in document"
        }

    # Chunking
    chunks = create_chunks(text)

    print("Number of Chunks:", len(chunks))

    # Validate chunks
    if len(chunks) == 0:
        return {
            "error": "No chunks generated"
        }

    # Embeddings
    embeddings = generate_embeddings(chunks)

    # Validate embeddings
    if embeddings.size == 0:
        return {
            "error": "Embedding generation failed"
        }

    # Store vectors
    store_embeddings(chunks, embeddings)

    return {
        "message": "Document processed successfully",
        "chunks": len(chunks)
    }