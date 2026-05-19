import os
import faiss
import pickle
import numpy as np

from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")


def retrieve_context(query, top_k=5):

    # Check vector files
    if not os.path.exists("vector_store/faiss.index"):
        return ["No uploaded document context available."]

    if not os.path.exists("vector_store/chunks.pkl"):
        return ["No stored chunks available."]

    # Load index
    index = faiss.read_index("vector_store/faiss.index")

    # Load chunks
    with open("vector_store/chunks.pkl", "rb") as f:
        chunks = pickle.load(f)

    # Generate query embedding
    query_embedding = model.encode(
        [query],
        convert_to_numpy=True
    ).astype("float32")

    # Search
    distances, indices = index.search(query_embedding, top_k)

    results = []

    seen = set()

    for idx in indices[0]:

        if idx < len(chunks):

            chunk = chunks[idx]

            # Remove duplicates
            if chunk not in seen:
                seen.add(chunk)
                results.append(chunk)

    return results