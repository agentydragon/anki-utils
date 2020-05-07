load("//src:anki_template.bzl", "anki_model", "anki_template")
load("//src/ordinary:ordinary_template.bzl", "ordinary_template")
load("//src/shared_styles:common_header.bzl", "common_header")

common_header(
    name = "header",
    # TODO: put the fields here...
    fields = ["Heading"],
)

anki_model(
    name = "absl_include",
    crowdanki_uuid = "89f5db8b-186c-11ea-9152-151b4dde761a",
    css = "//src/ordinary:ordinary.css",
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
