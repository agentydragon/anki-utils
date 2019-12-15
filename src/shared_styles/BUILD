load("@io_bazel_rules_sass//:defs.bzl", "sass_binary", "sass_library")
load("@io_bazel_rules_closure//closure:defs.bzl", "closure_js_binary", "closure_js_library")

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

closure_js_library(
    name = "log_lib",
    srcs = ["log.js"],
    suppress = [
        "JSC_MISSING_JSDOC",
        "JSC_UNKNOWN_EXPR_TYPE",
    ],
    deps = [
        "@io_bazel_rules_closure//closure/library",
    ],
    visibility = ["//visibility:public"],
)

closure_js_library(
    name = "heading_lib",
    srcs = ["heading.js"],
    suppress = [
        "JSC_MISSING_JSDOC",
        "JSC_UNKNOWN_EXPR_TYPE",
    ],
    deps = [
        ":log_lib",
        "@io_bazel_rules_closure//closure/library",
    ],
    visibility = ["//visibility:public"],
)

closure_js_library(
    name = "rng_lib",
    srcs = ["rng.js"],
    suppress = [
        "JSC_UNKNOWN_EXPR_TYPE",
    ],
    deps = [
        "@io_bazel_rules_closure//closure/library",
    ],
    visibility = ["//visibility:public"],
)

closure_js_binary(
    name = "ordinary_bin",
    deps = [":log_lib", ":heading_lib"],
    # TODO:"//src/shared_styles:mathjax_log_lib",
    entry_points = [
        "goog:agentydragon.logging",
        "goog:agentydragon.heading",
    ],
    visibility = ["//visibility:public"],
)
