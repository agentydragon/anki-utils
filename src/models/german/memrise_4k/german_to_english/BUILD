load("//src:anki_template.bzl", "anki_template")
load("//src/ordinary:ordinary_template.bzl", "ordinary_template")

anki_template(
    name = "german_to_english",
    answer_html = ":back",
    human_name = "German -> English",
    question_html = ":front",
    visibility = ["//src/models/german/memrise_4k:__subpackages__"],
)

ordinary_template(
    name = "front",
    html_header = "//src/models/german/memrise_4k:header.common_header.html",
    html_in = "front.html",
)

ordinary_template(
    name = "back",
    html_header = "//src/models/german/memrise_4k:header.common_header.html",
    html_in = "back.html",
)
