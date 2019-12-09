load("@io_bazel_rules_sass//:defs.bzl", "sass_binary")

sass_binary(
    name = "ordinary",
    src = "ordinary.scss",
    visibility = [
        "//src:__subpackages__",
        "//src/deploy:__subpackages__",
    ],
    deps = [
        "//src/shared_styles:card",
    ],
)
