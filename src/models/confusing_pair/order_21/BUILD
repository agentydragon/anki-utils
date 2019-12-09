load("//src:anki_template.bzl", "anki_template")
load("//src/ordinary:ordinary_template.bzl", "ordinary_template")

anki_template(
    name = "order_21",
    answer_html = ":back",
    human_name = "Flag 2,1 -> Country 2,1",
    question_html = ":front",
    visibility = ["//src/models/confusing_pair:__subpackages__"],
)

ordinary_template(
    name = "front",
    html_in = "front.html",
)

ordinary_template(
    name = "back",
    html_in = "back.html",
)
