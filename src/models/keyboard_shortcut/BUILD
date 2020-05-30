load("@io_bazel_rules_sass//:defs.bzl", "sass_binary", "sass_library")
load("//src:anki_template.bzl", "anki_model", "anki_template")
load(
    "@io_bazel_rules_closure//closure:defs.bzl",
    "closure_js_binary",
    "closure_js_library",
    "closure_js_test",
)
load("//src/shared_styles:common_header.bzl", "common_header")

FIELDS = [
    "Program",
    "Program mode",
    "Shortcut",
    "Effect",
    "Extra",
    "Mnemonic",
    # TODO(prvak): common
    "TODO",
    "Roam refs",
    "Sources",
]

common_header(
    name = "header",
    fields = FIELDS,
    visibility = [":__subpackages__"],
)

anki_model(
    name = "keyboard_shortcut",
    css = ":keyboard_shortcut.css",
    fields = FIELDS,
    templates = [
        "//src/models/keyboard_shortcut/effect_to_shortcut",
        "//src/models/keyboard_shortcut/shortcut_to_effect",
    ],
    type = "normal",
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
    deps = [
        "@io_bazel_rules_closure//closure/library",
    ],
)

closure_js_library(
    name = "main_lib",
    srcs = ["main.js"],
    suppress = [
        # Because of unguarded getElementByd
        "JSC_UNKNOWN_EXPR_TYPE",
    ],
    deps = [
        ":keyboard_shortcut_lib",
        "//src/shared_styles:heading_lib",
        "//src/shared_styles:log_lib",
        "//src/shared_styles:note_lib",
        "@io_bazel_rules_closure//closure/library",
    ],
)

closure_js_binary(
    name = "main_bin",
    entry_points = [
        "goog:agentydragon.keyboardShortcut.main",
    ],
    visibility = ["//src/models/keyboard_shortcut:__subpackages__"],
    deps = [
        ":keyboard_shortcut_lib",
        ":main_lib",
    ],
)

closure_js_test(
    name = "keyboard_shortcut_test",
    srcs = ["keyboard_shortcut_test.js"],
    entry_points = [
        "goog:agentydragon.keyboardShortcut.keyboardShortcutTest",
    ],
    deps = [
        ":keyboard_shortcut_lib",
        "@io_bazel_rules_closure//closure/library:testing",
    ],
)
