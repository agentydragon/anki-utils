load("//src:anki_template.bzl", "anki_model")
load("//src/shared_styles:common_header.bzl", "common_header")

common_header(
    name = "header",
    # TODO: put the fields here...
    fields = ["Heading"],
    visibility = [":__subpackages__"],
)

anki_model(
    name = "latex",
    crowdanki_uuid = "897fa736-186c-11ea-9152-151b4dde761a",
    css = "//src/ordinary:ordinary.css",
    templates = [
        "//src/models/latex/render_to_code",
        "//src/models/latex/code_to_render",
    ],
    visibility = ["//src/models:__subpackages__"],
)
