from langchain_text_splitters import RecursiveCharacterTextSplitter


def create_chunks(text: str):

    # Clean text
    text = text.strip()

    # Prevent empty text
    if not text:
        return []

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=100
    )

    chunks = splitter.split_text(text)

    # Remove empty chunks
    chunks = [
        chunk.strip()
        for chunk in chunks
        if chunk.strip()
    ]

    return chunks