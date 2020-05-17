load("//src:anki_template.bzl", "anki_model")
load("//src/shared_styles:common_header.bzl", "common_header")

common_header(
    name = "header",
    # TODO: put the fields here...
    fields = ["Heading"],
    visibility = [":__subpackages__"],
)

anki_model(
    name = "confusing_pair",
    css = "//src/ordinary:ordinary.css",
    templates = [
        "//src/models/confusing_pair/order_12",
        "//src/models/confusing_pair/order_21",
    ],
    visibility = ["//src/models:__subpackages__"],
)
