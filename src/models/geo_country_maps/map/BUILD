load("//src:anki_template.bzl", "anki_template")
load("//src/ordinary:ordinary_template.bzl", "ordinary_template")

anki_template(
    name = "map",
    answer_html = ":back",
    human_name = "Map",
    question_html = ":front",
    visibility = ["//src/models/geo_country_maps:__subpackages__"],
)

ordinary_template(
    name = "front",
    html_in = "front.html",
)

ordinary_template(
    name = "back",
    html_in = "back.html",
)
