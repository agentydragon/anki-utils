load("@io_bazel_rules_sass//:defs.bzl", "sass_binary")
load("//src:anki_template.bzl", "anki_model", "anki_template")
load("//src/ordinary:ordinary_template.bzl", "ordinary_template")
load("//src/shared_styles:common_header.bzl", "common_header")

common_header(
    name = "header",
    fields = [],
)

anki_model(
    name = "10k",
    css = ":german_10k.css",
    templates = [
        ":tmpl",
    ],
    visibility = ["//src/models:__subpackages__"],
)

anki_template(
    name = "tmpl",
    answer_html = ":back",
    human_name = "Card 1",
    question_html = ":front",
)

sass_binary(
    name = "style",
    src = "german_10k.scss",
    deps = [
        "//src/shared_styles:card",
    ],
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
