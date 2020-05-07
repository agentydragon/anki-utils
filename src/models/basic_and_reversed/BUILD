load("//src:anki_template.bzl", "anki_model")
load("//src/shared_styles:common_header.bzl", "common_header")

common_header(
    name = "header",
    # TODO: put the fields here...
    fields = ["Heading"],
)

anki_model(
    name = "basic_and_reversed",
    crowdanki_uuid = "a8359f82-ef5f-11e6-8d44-a44e31493108",
    css = "//src/ordinary:ordinary.css",
    templates = [
        "//src/models/basic_and_reversed/front_to_back",
        "//src/models/basic_and_reversed/back_to_front",
    ],
    visibility = ["//src/models:__subpackages__"],
)
