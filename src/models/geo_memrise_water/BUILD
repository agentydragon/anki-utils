load("@io_bazel_rules_sass//:defs.bzl", "sass_binary", "sass_library")
load("//src:anki_template.bzl", "anki_model", "anki_template")
load("//src/ordinary:ordinary_template.bzl", "ordinary_template")

anki_model(
    name = "geo_memrise_water",
    crowdanki_uuid = "8c695985-186c-11ea-9152-151b4dde761a",
    css = ":style.css",
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
    html_in = "front.html",
)

ordinary_template(
    name = "back",
    html_in = "back.html",
)
