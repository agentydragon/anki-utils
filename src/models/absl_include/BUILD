load("//src:anki_template.bzl", "anki_model", "anki_template")
load("//src/ordinary:ordinary_template.bzl", "ordinary_template")
load("//src/shared_styles:common_header.bzl", "common_header")

# TODO: put the fields here...
FIELDS = ["Heading"]

common_header(
    name = "header",
    fields = FIELDS,
)

anki_model(
    name = "absl_include",
    css = "//src/ordinary:ordinary.css",
    fields = FIELDS,
    templates = [
        ":function_to_include",
    ],
    visibility = ["//src/models:__subpackages__"],
)

anki_template(
    name = "function_to_include",
    answer_html = ":back",
    human_name = "Card 1",
    question_html = ":front",
)

ordinary_template(
    name = "front",
    html_header = ":header.common_header.html",
    html_in = "front.html",
)

ordinary_template(
    name = "back",
    html_header = ":header.common_header.html",
    html_in = "back.html",
)
