load("//src:anki_template.bzl", "anki_template", "anki_model")
load("//src/ordinary:ordinary_template.bzl", "ordinary_template")

anki_model(
    name = "basic_and_reversed",
    crowdanki_uuid = "a8359f82-ef5f-11e6-8d44-a44e31493108",
    css = "//src/ordinary:ordinary.css",
    templates = [
        ":front_to_back",
        ":back_to_front",
    ],
    visibility = ["//src/deploy:__subpackages__"],
)

anki_template(
    name = "front_to_back",
    answer_html = ":front_to_back_back.html",
    human_name = "Front -> Back",
    question_html = ":front_to_back_front.html",
)

anki_template(
    name = "back_to_front",
    answer_html = ":back_to_front_back.html",
    human_name = "Back -> Front",
    question_html = ":back_to_front_front.html",
)

ordinary_template(
    name = "front_to_back_front",
    html_in = "front_to_back_front_header.html",
    html_out = "front_to_back_front.html",
)

ordinary_template(
    name = "front_to_back_back",
    html_in = "front_to_back_back_header.html",
    html_out = "front_to_back_back.html",
)

ordinary_template(
    name = "back_to_front_front",
    html_in = "back_to_front_front_header.html",
    html_out = "back_to_front_front.html",
)

ordinary_template(
    name = "back_to_front_back",
    html_in = "back_to_front_back_header.html",
    html_out = "back_to_front_back.html",
)
