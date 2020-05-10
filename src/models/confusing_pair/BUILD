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
    crowdanki_uuid = "7717a042-186c-11ea-9152-151b4dde761a",
    css = "//src/ordinary:ordinary.css",
    templates = [
        "//src/models/confusing_pair/order_12",
        "//src/models/confusing_pair/order_21",
    ],
    visibility = ["//src/models:__subpackages__"],
)
