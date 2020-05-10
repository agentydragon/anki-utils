load("//src:anki_template.bzl", "anki_model")
load("//src/shared_styles:common_header.bzl", "common_header")

common_header(
    name = "header",
    # TODO: put the fields here...
    fields = ["Heading"],
    visibility = [":__subpackages__"],
)

anki_model(
    name = "vocabulary",
    crowdanki_uuid = "7660bc2e-186c-11ea-9152-151b4dde761a",
    css = "//src/ordinary:ordinary.css",
    templates = [
        "//src/models/german/vocabulary/english_to_german",
        "//src/models/german/vocabulary/german_to_english",
    ],
    visibility = ["//src/models:__subpackages__"],
)
