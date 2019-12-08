load("@io_bazel_rules_sass//:defs.bzl", "sass_binary", "sass_library")
load("//src:anki_template.bzl", "anki_template", "anki_model")

exports_files(["common.js"])

anki_model(
    name = "keyboard_shortcut",
    crowdanki_uuid = "873f9847-186c-11ea-9152-151b4dde761a",
    css = ":keyboard_shortcut.css",
    templates = [
        "//src/keyboard_shortcut/effect_to_shortcut",
        "//src/keyboard_shortcut/shortcut_to_effect",
    ],
    visibility = ["//src/deploy:__subpackages__"],
)

sass_binary(
    name = "sass",
    src = "keyboard_shortcut.scss",
    visibility = ["//src/deploy:__subpackages__"],
    deps = [
        "//src/shared_styles:card",
    ],
)
