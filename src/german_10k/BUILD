load("@io_bazel_rules_sass//:defs.bzl", "sass_binary")
load("//src:anki_template.bzl", "anki_template", "anki_model")
load("//src/ordinary:ordinary_template.bzl", "ordinary_template")

anki_model(
    name = "german_10k",
    crowdanki_uuid = "76cced62-186c-11ea-9152-151b4dde761a",
    css = ":german_10k.css",
    templates = [
        ":tmpl",
    ],
    visibility = ["//src/deploy:__subpackages__"],
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
    html_in = "front.html",
)

ordinary_template(
    name = "back",
    html_in = "back.html",
)
