load("@io_bazel_rules_sass//:defs.bzl", "sass_binary")
load("@io_bazel_rules_closure//closure:defs.bzl", "closure_js_binary", "closure_js_library", "closure_js_test")

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

closure_js_library(
    name = "main_lib",
    srcs = ["main.js"],
    deps = [
        "//src/shared_styles:heading_lib",
        "//src/shared_styles:log_lib",
        "//src/shared_styles:note_lib",
    ],
    suppress = [
        "JSC_REQUIRES_NOT_SORTED",
        "JSC_UNKNOWN_EXPR_TYPE",
    ],
)

closure_js_binary(
    name = "main_bin",
    deps = [":main_lib"],
    entry_points = [
        "goog:agentydragon.ordinary.main",
    ],
    visibility = ["//visibility:public"],
)
