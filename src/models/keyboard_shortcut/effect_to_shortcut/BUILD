load("//src:anki_template.bzl", "anki_template")
load("//src/ordinary:ordinary_template.bzl", "general_template")

anki_template(
    name = "effect_to_shortcut",
    answer_html = ":back",
    human_name = "Effect to Shortcut",
    question_html = ":front",
    visibility = ["//src/models/keyboard_shortcut:__subpackages__"],
)

general_template(
    name = "front",
    html_headers = ["front.html"],
    js_footers = ["//src/models/keyboard_shortcut:common.js"],
)

general_template(
    name = "back",
    html_headers = ["back.html"],
    js_footers = ["//src/models/keyboard_shortcut:common.js"],
)
