load("//src:anki_template.bzl", "anki_template")
load("//src/ordinary:ordinary_template.bzl", "ordinary_template")

anki_template(
    name = "code_to_render",
    answer_html = ":back",
    human_name = "Code to render and package",
    question_html = ":front",
    visibility = ["//src/models/latex:__subpackages__"],
)

ordinary_template(
    name = "front",
    html_header = "//src/models/latex:header.common_header.html",
    html_in = "front.html",
)

ordinary_template(
    name = "back",
    html_header = "//src/models/latex:header.common_header.html",
    html_in = "back.html",
)
