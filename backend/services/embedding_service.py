from sentence_transformers import SentenceTransformer
import numpy as np

model = SentenceTransformer("all-MiniLM-L6-v2")


def generate_embeddings(chunks):

    # Prevent empty chunks
    if not chunks:
        return np.array([])

    embeddings = model.encode(
        chunks,
        convert_to_numpy=True
    )

    embeddings = embeddings.astype("float32")

    # Ensure 2D
    if len(embeddings.shape) == 1:
        embeddings = embeddings.reshape(1, -1)

    print("Generated Embeddings Shape:", embeddings.shape)

    return embeddings