load("@io_bazel_rules_sass//:defs.bzl", "sass_binary", "sass_library")
load(
    "@io_bazel_rules_closure//closure:defs.bzl",
    "closure_js_library",
    "closure_js_test",
)

exports_files([
    "common_header.html",
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
    srcs = [
        "log.js",
        "mathjax_externs.js",
    ],
    suppress = [
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
        ":note_lib",
        "@io_bazel_rules_closure//closure/library",
    ],
    visibility = ["//visibility:public"],
)

closure_js_library(
    name = "rng_lib",
    srcs = ["rng.js"],
    deps = [
        ":log_lib",
        ":note_lib",
        "@io_bazel_rules_closure//closure/library",
    ],
    suppress = [
        "JSC_UNKNOWN_EXPR_TYPE",
    ],
    visibility = ["//visibility:public"],
)

closure_js_library(
    name = "note_lib",
    srcs = ["note.js"],
    suppress = [
        "JSC_MISSING_JSDOC",
    ],
    deps = [
        "@io_bazel_rules_closure//closure/library",
    ],
    visibility = ["//visibility:public"],
)

closure_js_test(
    name = "heading_test",
    srcs = ["heading_test.js"],
    entry_points = [
        "goog:agentydragon.headingTest",
    ],
    deps = [
        "@io_bazel_rules_closure//closure/library:testing",
        ":heading_lib",
        ":note_lib",
    ],
)
