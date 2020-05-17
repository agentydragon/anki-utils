load("//src:anki_template.bzl", "anki_model", "anki_template")
load("//src/ordinary:ordinary_template.bzl", "ordinary_template")
load("//src/shared_styles:common_header.bzl", "common_header")

FIELDS = [
    "Name",
    "Character",
    "Hex code",
]

common_header(
    name = "header",
    fields = FIELDS,
)

# TODO(prvak): set title to "Unicode" by default

anki_model(
    name = "unicode",
    css = "//src/ordinary:ordinary.css",
    fields = FIELDS,
    templates = [
        ":tmpl",
    ],
    visibility = ["//src/models:__subpackages__"],
)

anki_template(
    name = "tmpl",
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
