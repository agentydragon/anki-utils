load("//src:anki_template.bzl", "anki_model", "anki_template")
load("//src/ordinary:ordinary_template.bzl", "ordinary_template")
load("//src/shared_styles:common_header.bzl", "common_header")

common_header(
    name = "header",
    # TODO: put the fields here...
    fields = [
        #"Text",  # TODO: this is a cloze field
        "Heading",
        "Extra",
        "TODO",
        "Ambiguous",
        "Sources",
        "Remarks (hidden)",
        "Roam refs",
    ],
)

anki_model(
    name = "cloze",
    crowdanki_uuid = "760de482-186c-11ea-9152-151b4dde761a",
    css = "//src/ordinary:ordinary.css",
    # TODO: put the fields here...
    templates = [
        ":tmpl",
    ],
    visibility = ["//src/models:__subpackages__"],
)

anki_template(
    name = "tmpl",
    answer_html = ":back",
    human_name = "Cloze",
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
