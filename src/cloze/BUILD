load("//src:anki_template.bzl", "anki_model", "anki_template")
load("//src/ordinary:ordinary_template.bzl", "ordinary_template")

anki_model(
    name = "cloze",
    crowdanki_uuid = "760de482-186c-11ea-9152-151b4dde761a",
    css = "//src/ordinary:ordinary.css",
    templates = [
        ":tmpl",
    ],
    visibility = ["//src/deploy:__subpackages__"],
)

anki_template(
    name = "tmpl",
    answer_html = ":back",
    human_name = "Cloze",
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
