load("@io_bazel_rules_sass//:defs.bzl", "sass_binary")
load("//src:anki_template.bzl", "anki_template", "anki_model")
load("//src/ordinary:ordinary_template.bzl", "general_template")

anki_model(
    name = "permuted_cloze",
    crowdanki_uuid = "760de475-186c-11ea-9152-151b4dde761a",
    css = ":permuted_cloze.css",
    templates = [
        ":template",
    ],
    visibility = ["//src/deploy:__subpackages__"],
)

anki_template(
    name = "template",
    answer_html = ":back",
    human_name = "Cloze",
    question_html = ":front",
)

general_template(
    name = "back",
    html_headers = [
        "//src/shared_styles:common_header.html",
        "back_header.html",
    ],
    js_footers = [
        "//src/shared_styles:log.js",
        "//src/shared_styles:heading.js",
        "common.js",
    ],
)

general_template(
    name = "front",
    html_headers = [
        "//src/shared_styles:common_header.html",
        "front_header.html",
    ],
    js_footers = [
        "//src/shared_styles:log.js",
        "//src/shared_styles:heading.js",
        "common.js",
    ],
)

sass_binary(
    name = "sass",
    src = "permuted_cloze.scss",
    visibility = ["//src/deploy:__subpackages__"],
    deps = [
        "//src/shared_styles:card",
    ],
)
