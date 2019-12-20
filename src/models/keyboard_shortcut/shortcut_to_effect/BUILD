load("//src:anki_template.bzl", "anki_template")
load("//src/ordinary:ordinary_template.bzl", "ordinary_template")
load("@io_bazel_rules_closure//closure:defs.bzl", "closure_js_library")

anki_template(
    name = "shortcut_to_effect",
    answer_html = ":back",
    human_name = "Shortcut to Effect",
    question_html = ":front",
    visibility = ["//src/models/keyboard_shortcut:__subpackages__"],
)

ordinary_template(
    name = "front",
    html_in = "front.html",
    js_binary = "//src/models/keyboard_shortcut:main_bin.js",
)

ordinary_template(
    name = "back",
    html_in = "back.html",
    js_binary = "//src/models/keyboard_shortcut:main_bin.js",
)
