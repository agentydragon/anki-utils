load("@io_bazel_rules_sass//:defs.bzl", "sass_binary", "sass_library")
load("//src:anki_template.bzl", "anki_model", "anki_template")
load("@io_bazel_rules_closure//closure:defs.bzl", "closure_js_binary", "closure_js_library")

exports_files(["common.js"])

anki_model(
    name = "keyboard_shortcut",
    crowdanki_uuid = "873f9847-186c-11ea-9152-151b4dde761a",
    css = ":keyboard_shortcut.css",
    templates = [
        "//src/models/keyboard_shortcut/effect_to_shortcut",
        "//src/models/keyboard_shortcut/shortcut_to_effect",
    ],
    visibility = ["//src/models:__subpackages__"],
)

sass_binary(
    name = "sass",
    src = "keyboard_shortcut.scss",
    deps = [
        "//src/shared_styles:card",
    ],
)

closure_js_library(
    name = "common_lib",
    srcs = ["common.js"],
    suppress = [
        "JSC_UNKNOWN_EXPR_TYPE",
        "JSC_REQUIRES_NOT_SORTED",
    ],
    deps = [
        "@io_bazel_rules_closure//closure/library",
        "//src/shared_styles:log_lib",
        "//src/shared_styles:heading_lib",
        "//src/shared_styles:note_lib",
    ],
)

closure_js_binary(
    name = "ordinary_bin",
    deps = [
        ":common_lib",
    ],
    # TODO:"//src/shared_styles:mathjax_log_lib",
    entry_points = [
        "goog:agentydragon.keyboardShortcut",
    ],
    visibility = ["//src/models/keyboard_shortcut:__subpackages__"],
)
