load("//src:anki_template.bzl", "anki_model")
load("//src/shared_styles:common_header.bzl", "common_header")

FIELDS = []

common_header(
    name = "header",
    fields = FIELDS,
    visibility = [":__subpackages__"],
)

anki_model(
    name = "latex",
    css = "//src/ordinary:ordinary.css",
    fields = FIELDS,
    templates = [
        "//src/models/latex/render_to_code",
        "//src/models/latex/code_to_render",
    ],
    visibility = ["//src/models:__subpackages__"],
)
