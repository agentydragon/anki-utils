load("//src:anki_template.bzl", "anki_model")
load("//src/shared_styles:common_header.bzl", "common_header")

FIELDS = [
    "Definition",
    "IncludeDefinitionToTerm",
    "Term",
]

common_header(
    name = "header",
    fields = FIELDS,
    visibility = ["//src/models/english_term:__subpackages__"],
)

anki_model(
    name = "english_term",
    css = "//src/ordinary:ordinary.css",
    fields = FIELDS,
    templates = [
        "//src/models/english_term/term_to_definition",
        "//src/models/english_term/definition_to_term",
    ],
    type = "normal",
    visibility = ["//src/models:__subpackages__"],
)
