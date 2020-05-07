load("//src:anki_template.bzl", "anki_template")
load("//src/ordinary:ordinary_template.bzl", "ordinary_template")

anki_template(
    name = "flag",
    answer_html = ":back",
    human_name = "Flag",
    question_html = ":front",
    visibility = ["//src/models/geo_country_maps:__subpackages__"],
)

ordinary_template(
    name = "front",
    html_header = "//src/models/geo_country_maps:header.common_header.html",
    html_in = "front.html",
)

ordinary_template(
    name = "back",
    html_header = "//src/models/geo_country_maps:header.common_header.html",
    html_in = "back.html",
)
