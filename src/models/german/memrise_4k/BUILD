load("//src:anki_template.bzl", "anki_model")
load("//src/shared_styles:common_header.bzl", "common_header")

common_header(
    name = "header",
    fields = [],
)

anki_model(
    name = "memrise_4k",
    crowdanki_uuid = "76a70b10-186c-11ea-9152-151b4dde761a",
    css = "//src/ordinary:ordinary.css",
    templates = [
        "//src/models/german/memrise_4k/english_to_german",
        "//src/models/german/memrise_4k/german_to_english",
    ],
    visibility = ["//src/models:__subpackages__"],
)
