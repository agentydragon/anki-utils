load("@io_bazel_rules_sass//:defs.bzl", "sass_binary", "sass_library")
load("//src:anki_template.bzl", "anki_model", "anki_template")
load(
    "@io_bazel_rules_closure//closure:defs.bzl",
    "closure_js_binary",
    "closure_js_library",
    "closure_js_test",
)

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
    name = "keyboard_shortcut_lib",
    srcs = ["keyboard_shortcut.js"],
    suppress = [
        "JSC_UNKNOWN_EXPR_TYPE",
    ],
    deps = [
        "@io_bazel_rules_closure//closure/library",
    ],
)

closure_js_library(
    name = "main_lib",
    srcs = ["main.js"],
    suppress = [
        "JSC_UNKNOWN_EXPR_TYPE",
        "JSC_REQUIRES_NOT_SORTED",
    ],
    deps = [
        ":keyboard_shortcut_lib",
        "@io_bazel_rules_closure//closure/library",
        "//src/shared_styles:log_lib",
        "//src/shared_styles:heading_lib",
        "//src/shared_styles:note_lib",
    ],
)

closure_js_binary(
    name = "main_bin",
    deps = [
        ":keyboard_shortcut_lib",
        ":main_lib",
    ],
    entry_points = [
        "goog:agentydragon.keyboardShortcut.main",
    ],
    visibility = ["//src/models/keyboard_shortcut:__subpackages__"],
)

closure_js_test(
    name = "keyboard_shortcut_test",
    srcs = ["keyboard_shortcut_test.js"],
    entry_points = [
        "goog:agentydragon.keyboardShortcut.keyboardShortcutTest",
    ],
    deps = [
        "@io_bazel_rules_closure//closure/library:testing",
        ":keyboard_shortcut_lib",
    ],
)
