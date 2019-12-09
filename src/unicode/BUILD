load("//src:anki_template.bzl", "anki_template", "anki_model")
load("//src/ordinary:ordinary_template.bzl", "ordinary_template")

# TODO(prvak): set title to "Unicode" by default

anki_model(
    name = "unicode",
    crowdanki_uuid = "8a74a31a-186c-11ea-9152-151b4dde761a",
    css = "//src/ordinary:ordinary.css",
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

ordinary_template(
    name = "front",
    html_in = "front.html",
)

ordinary_template(
    name = "back",
    html_in = "back.html",
)
