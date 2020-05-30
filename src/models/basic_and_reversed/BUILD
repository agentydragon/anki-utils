load("//src:anki_template.bzl", "anki_model")
load("//src/shared_styles:common_header.bzl", "common_header")

FIELDS = [
    "Heading",
    "Front",
    "Back",
    "Add Reverse",
    # TODO(prvak): Reuse
    "TODO",
    "Source",
    "Ambiguous",
]

common_header(
    name = "header",
    fields = FIELDS,
    visibility = ["//src/models/basic_and_reversed:__subpackages__"],
)

anki_model(
    name = "basic_and_reversed",
    css = "//src/ordinary:ordinary.css",
    fields = FIELDS,
    templates = [
        "//src/models/basic_and_reversed/front_to_back",
        "//src/models/basic_and_reversed/back_to_front",
    ],
    type = "normal",
    visibility = ["//src/models:__subpackages__"],
)
