load("@io_bazel_rules_sass//:defs.bzl", "sass_binary", "sass_library")

exports_files([
    "common_header.html",
    "heading.js",
    "mathjax_log.js",
    "log.js",
])

sass_library(
    name = "keyboard_shortcut",
    srcs = ["keyboard_shortcut.scss"],
)

sass_library(
    name = "cloze",
    srcs = ["cloze.scss"],
)

sass_library(
    name = "card",
    srcs = ["card.scss"],
    visibility = ["//visibility:public"],
    deps = [
        ":cloze",
        ":keyboard_shortcut",
        ":solarized",
    ],
)

sass_library(
    name = "solarized",
    srcs = ["solarized.scss"],
)
