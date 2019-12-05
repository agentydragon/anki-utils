load("@io_bazel_rules_sass//:defs.bzl", "sass_binary", "sass_library")

package(
    default_visibility = ["//visibility:public"],
)

sass_library(
    name = "keyboard_shortcut",
    srcs = ["keyboard_shortcut.scss"],
)

sass_library(
    name = "card",
    srcs = ["card.scss"],
)

sass_binary(
    name = "bin",
    src = "bin.scss",
    deps = [
        ":card",
        ":keyboard_shortcut",
    ],
)
