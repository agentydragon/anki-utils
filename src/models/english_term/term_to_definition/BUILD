load("//src:anki_template.bzl", "anki_template")
load("//src/ordinary:ordinary_template.bzl", "ordinary_template")

anki_template(
    name = "term_to_definition",
    answer_html = ":back",
    human_name = "Card 1",
    question_html = ":front",
    visibility = ["//src/models/english_term:__subpackages__"],
)

ordinary_template(
    name = "front",
    html_in = "front.html",
)

ordinary_template(
    name = "back",
    html_in = "back.html",
)
