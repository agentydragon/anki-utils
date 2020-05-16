load("//src:anki_template.bzl", "anki_model")
load("//src/shared_styles:common_header.bzl", "common_header")

common_header(
    name = "header",
    # TODO: put the fields here...
    fields = [],
    visibility = ["//src/models/english_term:__subpackages__"],
)

anki_model(
    name = "english_term",
    crowdanki_uuid = "760de492-186c-11ea-9152-151b4dde761a",
    css = "//src/ordinary:ordinary.css",
    templates = [
        "//src/models/english_term/term_to_definition",
        "//src/models/english_term/definition_to_term",
    ],
    visibility = ["//src/models:__subpackages__"],
)
