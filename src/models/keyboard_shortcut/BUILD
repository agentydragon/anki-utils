load("@io_bazel_rules_sass//:defs.bzl", "sass_binary", "sass_library")
load("//src:anki_template.bzl", "anki_model", "anki_template")

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
