load("//src:anki_template.bzl", "anki_template")
load("//src/ordinary:ordinary_template.bzl", "ordinary_template")
load("//src/shared_styles:common_header.bzl", "common_header")

anki_template(
    name = "state_keys",
    answer_html = ":back",
    human_name = "State keys",
    question_html = ":front",
    visibility = ["//src/models/vim_golf:__subpackages__"],
)

ordinary_template(
    name = "front",
    html_header = "//src/models/vim_golf:header.common_header.html",
    html_in = "front.html",
)

ordinary_template(
    name = "back",
    html_header = "//src/models/vim_golf:header.common_header.html",
    html_in = "back.html",
)
