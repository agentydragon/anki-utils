load("//src:anki_template.bzl", "anki_model")
load("//src/shared_styles:common_header.bzl", "common_header")

FIELDS = [
    "Buffer before",
    "Keys",
    "Buffer after",
    "Extra",
    "TODO",
    "Ambiguous",
    "Sources",
    "Roam refs",
]

common_header(
    name = "header",
    # TODO: put the fields here...
    fields = FIELDS,
    visibility = ["//src/models/vim_golf:__subpackages__"],
)

anki_model(
    name = "vim_golf",
    css = "//src/ordinary:ordinary.css",
    fields = FIELDS,
    templates = [
        "//src/models/vim_golf/state_keys",
        "//src/models/vim_golf/state_effect",
    ],
    visibility = ["//src/models:__subpackages__"],
)
