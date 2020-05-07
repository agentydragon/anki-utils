load("//src:anki_template.bzl", "anki_model")
load("//src/shared_styles:common_header.bzl", "common_header")

common_header(
    name = "header",
    # TODO: put the fields here...
    fields = ["Heading"],
)

anki_model(
    name = "latex_math",
    crowdanki_uuid = "897fa727-186c-11ea-9152-151b4dde761a",
    css = "//src/ordinary:ordinary.css",
    templates = [
        "//src/models/latex_math/render_to_code",
        "//src/models/latex_math/code_to_render",
    ],
    visibility = ["//src/models:__subpackages__"],
)
