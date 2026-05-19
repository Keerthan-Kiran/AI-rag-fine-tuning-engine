import fitz


def extract_text_from_pdf(pdf_path: str):

    text = ""

    document = fitz.open(pdf_path)

    for page in document:

        extracted = page.get_text()

        if extracted:
            text += extracted

    return text


def extract_text_from_txt(txt_path: str):

    with open(txt_path, "r", encoding="utf-8") as file:
        return file.read()