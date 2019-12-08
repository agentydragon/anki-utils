load("//src:anki_template.bzl", "anki_template")
load("//src/ordinary:ordinary_template.bzl", "ordinary_template")

anki_template(
    name = "front_to_back",
    answer_html = ":back",
    human_name = "Front -> Back",
    question_html = ":front",
    visibility = ["//src/basic_and_reversed:__subpackages__"],
)

ordinary_template(
    name = "front",
    html_in = "front.html",
)

ordinary_template(
    name = "back",
    html_in = "back.html",
)
