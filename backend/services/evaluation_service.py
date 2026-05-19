import textstat
import language_tool_python


tool = language_tool_python.LanguageTool('en-US')


def evaluate_text(text):
    readability = textstat.flesch_reading_ease(text)

    grammar_errors = len(tool.check(text))

    grammar_score = max(0, 100 - grammar_errors)

    quality_score = (readability + grammar_score) / 2

    return {
        "readability": readability,
        "grammar_score": grammar_score,
        "quality_score": quality_score
    }