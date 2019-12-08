load("//src:anki_template.bzl", "anki_template")
load("//src/ordinary:ordinary_template.bzl", "ordinary_template")

anki_template(
    name = "english_to_german",
    answer_html = ":back",
    human_name = "English->German",
    question_html = ":front",
    visibility = ["//src/german_vocabulary:__subpackages__"],
)

ordinary_template(
    name = "front",
    html_in = "front.html",
)

ordinary_template(
    name = "back",
    html_in = "back.html",
)
