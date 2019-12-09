load("//src:anki_template.bzl", "anki_template")
load("//src/ordinary:ordinary_template.bzl", "ordinary_template")

anki_template(
    name = "german_to_english",
    answer_html = ":back",
    human_name = "German->English",
    question_html = ":front",
    visibility = ["//src/models/german_vocabulary:__subpackages__"],
)

ordinary_template(
    name = "front",
    html_in = "front.html",
)

ordinary_template(
    name = "back",
    html_in = "back.html",
)
