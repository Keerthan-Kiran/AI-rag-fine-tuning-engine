from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.upload import router as upload_router
from routes.generate import router as generate_router
from routes.retrieval import router as retrieval_router

app = FastAPI(title="AI Fine-Tuning Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router)
app.include_router(generate_router)
app.include_router(retrieval_router)

@app.get("/health")
def health_check():
    return {"status": "healthy"}