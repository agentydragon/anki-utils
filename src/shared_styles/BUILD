load("@io_bazel_rules_sass//:defs.bzl", "sass_binary", "sass_library")
load(
    "@io_bazel_rules_closure//closure:defs.bzl",
    "closure_js_library",
    "closure_js_test",
)
load("@rules_python//python:defs.bzl", "py_binary")

# exports_files([
#     "common_header.html",
# ])

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
        # Because of window error handling.
        "JSC_UNKNOWN_EXPR_TYPE",
    ],
    visibility = ["//visibility:public"],
    deps = [
        ":note_lib",
        "@io_bazel_rules_closure//closure/library",
    ],
)

closure_js_library(
    name = "tags_lib",
    srcs = ["tags.js"],
    deps = [
        "@io_bazel_rules_closure//closure/library",
    ],
)

closure_js_library(
    name = "heading_lib",
    srcs = ["heading.js"],
    visibility = ["//visibility:public"],
    deps = [
        ":log_lib",
        ":note_lib",
        ":tags_lib",
        "@io_bazel_rules_closure//closure/library",
    ],
)

closure_js_library(
    name = "rng_lib",
    srcs = ["rng.js"],
    suppress = [
        # Because of shuffling array of unknown concrete type.
        "JSC_UNKNOWN_EXPR_TYPE",
    ],
    visibility = ["//visibility:public"],
    deps = [
        ":log_lib",
        ":note_lib",
        "@io_bazel_rules_closure//closure/library",
    ],
)

closure_js_library(
    name = "note_lib",
    srcs = ["note.js"],
    visibility = ["//visibility:public"],
    deps = [
        "@io_bazel_rules_closure//closure/library",
    ],
)

closure_js_test(
    name = "heading_test",
    srcs = ["heading_test.js"],
    entry_points = [
        "goog:agentydragon.headingTest",
    ],
    deps = [
        ":heading_lib",
        ":note_lib",
        "@io_bazel_rules_closure//closure/library:testing",
    ],
)

closure_js_test(
    name = "tags_test",
    srcs = ["tags_test.js"],
    entry_points = [
        "goog:agentydragon.tagsTest",
    ],
    deps = [
        ":tags_lib",
        "@io_bazel_rules_closure//closure/library:testing",
    ],
)

py_binary(
    name = "make_common_header",
    srcs = ["make_common_header.py"],
    visibility = ["//visibility:public"],
    deps = ["@rules_python//python/runfiles"],
)
