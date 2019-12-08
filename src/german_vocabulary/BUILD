load("//src:anki_template.bzl", "anki_template", "anki_model")
load("//src/ordinary:ordinary_template.bzl", "ordinary_template")

anki_model(
    name = "german_vocabulary",
    crowdanki_uuid = "7660bc2e-186c-11ea-9152-151b4dde761a",
    css = "//src/ordinary:ordinary.css",
    templates = [
        ":english_to_german",
        ":german_to_english",
    ],
    visibility = ["//src/deploy:__subpackages__"],
)

anki_template(
    name = "english_to_german",
    answer_html = ":english_to_german_back.html",
    human_name = "English->German",
    question_html = ":english_to_german_front.html",
)

anki_template(
    name = "german_to_english",
    answer_html = ":german_to_english_back.html",
    human_name = "German->English",
    question_html = ":german_to_english_front.html",
)

ordinary_template(
    name = "english_to_german_front",
    html_in = "english_to_german_front_header.html",
    html_out = "english_to_german_front.html",
)

ordinary_template(
    name = "english_to_german_back",
    html_in = "english_to_german_back_header.html",
    html_out = "english_to_german_back.html",
)

ordinary_template(
    name = "german_to_english_front",
    html_in = "german_to_english_front_header.html",
    html_out = "german_to_english_front.html",
)

ordinary_template(
    name = "german_to_english_back",
    html_in = "german_to_english_back_header.html",
    html_out = "german_to_english_back.html",
)
