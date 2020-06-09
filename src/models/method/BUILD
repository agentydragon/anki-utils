load("//src:anki_template.bzl", "anki_model", "anki_template")
load("//src/ordinary:ordinary_template.bzl", "ordinary_template")
load("//src/shared_styles:common_header.bzl", "common_header")

# TODO: put the fields here...
FIELDS = [
    "Method",
    "Takes",
    "Returns",
    "Effect",
    "Heading",
    "Extra",
    "TODO",
    "Ambiguous",
    "Sources",
    "Remarks (hidden)",
    "Roam refs",
]

common_header(
    name = "header",
    fields = FIELDS,
)

anki_model(
    name = "method",
    css = "//src/ordinary:ordinary.css",
    fields = FIELDS,
    # TODO: put the fields here...
    templates = [
        ":tmpl",
    ],
    type = "cloze",
    visibility = ["//src/models:__subpackages__"],
)

anki_template(
    name = "tmpl",
    answer_html = ":back",
    human_name = "Method",
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
