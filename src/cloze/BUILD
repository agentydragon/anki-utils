load("//src:anki_template.bzl", "anki_template", "anki_model")
load("//src/ordinary:ordinary_template.bzl", "ordinary_template")

anki_model(
    name = "cloze",
    crowdanki_uuid = "760de482-186c-11ea-9152-151b4dde761a",
    css = "//src/ordinary:ordinary.css",
    templates = [
        ":cloze_tmpl",
    ],
    visibility = ["//src/deploy:__subpackages__"],
)

anki_template(
    name = "cloze_tmpl",
    answer_html = ":cloze_back",
    human_name = "Cloze",
    question_html = ":cloze_front",
)

ordinary_template(
    name = "cloze_front",
    html_in = "cloze_front_header.html",
)

ordinary_template(
    name = "cloze_back",
    html_in = "cloze_back_header.html",
)
