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
    css = "//src/ordinary:ordinary.css",
    templates = [
        "//src/models/german/vocabulary/english_to_german",
        "//src/models/german/vocabulary/german_to_english",
    ],
    visibility = ["//src/models:__subpackages__"],
)
