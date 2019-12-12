load("//src:anki_template.bzl", "anki_template")
load("//src/ordinary:ordinary_template.bzl", "ordinary_template")

anki_template(
    name = "definition_to_term",
    answer_html = ":back",
    human_name = "Card 2",
    question_html = ":front",
    visibility = ["//src/models/english_term:__subpackages__"],
)

ordinary_template(
    name = "front",
    html_in = "front.html",
    html_prepend = ["header.html"],
    html_append = ["footer.html"],
)

ordinary_template(
    name = "back",
    html_in = "back.html",
    html_prepend = ["header.html"],
    html_append = ["footer.html"],
)
