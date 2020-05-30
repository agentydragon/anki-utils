load("//src:anki_template.bzl", "anki_model")
load("//src/shared_styles:common_header.bzl", "common_header")

FIELDS = []

common_header(
    name = "header",
    # TODO: put the fields here...
    fields = FIELDS,
    visibility = [":__subpackages__"],
)

anki_model(
    name = "confusing_pair",
    css = "//src/ordinary:ordinary.css",
    fields = FIELDS,
    templates = [
        "//src/models/confusing_pair/order_12",
        "//src/models/confusing_pair/order_21",
    ],
    type = "normal",
    visibility = ["//src/models:__subpackages__"],
)
