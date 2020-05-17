load("//src:anki_template.bzl", "anki_model")
load("//src/shared_styles:common_header.bzl", "common_header")

common_header(
    name = "header",
    fields = [],
    # TODO: put the fields here...
    visibility = [":__subpackages__"],
)

anki_model(
    name = "latex",
    css = "//src/ordinary:ordinary.css",
    templates = [
        "//src/models/latex/render_to_code",
        "//src/models/latex/code_to_render",
    ],
    visibility = ["//src/models:__subpackages__"],
)
