load("@io_bazel_rules_sass//:defs.bzl", "sass_binary", "sass_library")
load("//src:anki_template.bzl", "anki_model", "anki_template")
load("//src/ordinary:ordinary_template.bzl", "ordinary_template")
load("//src/shared_styles:common_header.bzl", "common_header")

FIELDS = []

common_header(
    name = "header",
    # TODO: put the fields here...
    fields = FIELDS,
)

anki_model(
    name = "geo_memrise_water",
    css = ":style.css",
    fields = FIELDS,
    templates = [":tmpl"],
    visibility = ["//src/models:__subpackages__"],
)

sass_binary(
    name = "sass",
    src = "style.scss",
    # visibility = ["//src/deploy:__subpackages__"],
    deps = [
        "//src/shared_styles:card",
    ],
)

anki_template(
    name = "tmpl",
    answer_html = ":back",
    human_name = "Location -> Name",
    question_html = ":front",
)

ordinary_template(
    name = "front",
    html_header = ":header.common_header.html",
    html_in = "front.html",
)

ordinary_template(
    name = "back",
    html_header = ":header.common_header.html",
    html_in = "back.html",
)
