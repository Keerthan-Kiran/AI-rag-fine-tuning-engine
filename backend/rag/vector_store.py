import faiss
import numpy as np
import pickle
import os

VECTOR_DIMENSION = 384


def store_embeddings(chunks, embeddings):

    # Convert embeddings
    embeddings = np.array(embeddings).astype("float32")

    # Ensure 2D
    if len(embeddings.shape) == 1:
        embeddings = embeddings.reshape(1, -1)

    # DEBUG
    print("Embeddings Shape:", embeddings.shape)

    # Ensure correct dimension
    if embeddings.shape[1] != VECTOR_DIMENSION:
        raise ValueError(
            f"Expected dimension {VECTOR_DIMENSION}, got {embeddings.shape[1]}"
        )

    # Create NEW FAISS index every upload
    index = faiss.IndexFlatL2(VECTOR_DIMENSION)

    # Add embeddings
    index.add(embeddings)

    # Ensure folder exists
    os.makedirs("vector_store", exist_ok=True)

    # Save index
    faiss.write_index(index, "vector_store/faiss.index")

    # Save chunks
    with open("vector_store/chunks.pkl", "wb") as f:
        pickle.dump(chunks, f)

    print("FAISS index stored successfully")