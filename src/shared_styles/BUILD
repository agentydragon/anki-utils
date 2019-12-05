load("@io_bazel_rules_sass//:defs.bzl", "sass_binary", "sass_library")

sass_library(
    name = "keyboard_shortcut",
    srcs = ["keyboard_shortcut.scss"],
)

sass_library(
    name = "card",
    srcs = ["card.scss"],
    visibility = ["//visibility:public"],
    deps = [
        ":keyboard_shortcut",
        ":solarized",
    ],
)

sass_library(
    name = "solarized",
    srcs = ["solarized.scss"],
)
