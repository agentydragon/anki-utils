load("//src:anki_template.bzl", "anki_template")
load("//src/ordinary:ordinary_template.bzl", "general_template")
load("@io_bazel_rules_closure//closure:defs.bzl", "closure_js_binary", "closure_js_library")

anki_template(
    name = "shortcut_to_effect",
    answer_html = ":back",
    human_name = "Shortcut to Effect",
    question_html = ":front",
    visibility = ["//src/models/keyboard_shortcut:__subpackages__"],
)

general_template(
    name = "front",
    html_headers = ["front.html"],
    #js_footers = ["//src/models/keyboard_shortcut:common.js"],
    js_binary = "//src/models/keyboard_shortcut:ordinary_bin.js",
)

general_template(
    name = "back",
    html_headers = ["back.html"],
    #js_footers = ["//src/models/keyboard_shortcut:common.js"],
    js_binary = "//src/models/keyboard_shortcut:ordinary_bin.js",
)
