load("//src:anki_template.bzl", "anki_template")
load("//src/ordinary:ordinary_template.bzl", "ordinary_template")

anki_template(
    name = "effect_to_shortcut",
    answer_html = ":back",
    human_name = "Effect to Shortcut",
    question_html = ":front",
    visibility = ["//src/models/keyboard_shortcut:__subpackages__"],
)

ordinary_template(
    name = "front",
    html_header = "//src/models/keyboard_shortcut:header.common_header.html",
    html_in = "front.html",
    js_binary = "//src/models/keyboard_shortcut:main_bin.js",
)

ordinary_template(
    name = "back",
    html_header = "//src/models/keyboard_shortcut:header.common_header.html",
    html_in = "back.html",
    js_binary = "//src/models/keyboard_shortcut:main_bin.js",
)
