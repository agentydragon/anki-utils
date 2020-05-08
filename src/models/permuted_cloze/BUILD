load("@io_bazel_rules_sass//:defs.bzl", "sass_binary")
load("@io_bazel_rules_webtesting//web:py.bzl", "py_web_test_suite")
load("//src:anki_template.bzl", "anki_model", "anki_template")
load("//src/ordinary:ordinary_template.bzl", "ordinary_template")
load("@io_bazel_rules_closure//closure:defs.bzl", "closure_js_binary", "closure_js_library")
load("//src/shared_styles:common_header.bzl", "common_header")

common_header(
    name = "header",
    fields = [
        "TextUnclozed",
        "Heading",
        "Seed",
        "Log",
    ],
)

anki_model(
    name = "permuted_cloze",
    crowdanki_uuid = "760de475-186c-11ea-9152-151b4dde761a",
    css = ":permuted_cloze.css",
    templates = [
        ":template",
    ],
    visibility = ["//src/models:__subpackages__"],
)

anki_template(
    name = "template",
    answer_html = ":back",
    human_name = "Cloze",
    question_html = ":front",
)

ordinary_template(
    name = "back",
    html_header = ":header.common_header.html",
    html_in = "back_header.html",
    #extra_js = ["common.js"],
    js_binary = ":common_bin.js",
)

ordinary_template(
    name = "front",
    html_header = ":header.common_header.html",
    html_in = "front_header.html",
    #extra_js = ["common.js"],
    js_binary = ":common_bin.js",
)

sass_binary(
    name = "sass",
    src = "permuted_cloze.scss",
    deps = [
        "//src/shared_styles:card",
    ],
)

py_web_test_suite(
    name = "test",
    srcs = ["test.py"],
    browsers = [
        "@io_bazel_rules_webtesting//browsers:chromium-local",
    ],
    data = [":front.expanded.html"],
    local = True,
    deps = [
        "//src/testing:card_testcase",
    ],
)

closure_js_library(
    name = "common_lib",
    srcs = ["common.js"],
    suppress = [
        "JSC_MISSING_JSDOC",
        "JSC_UNKNOWN_EXPR_TYPE",
    ],
    deps = [
        "//src/shared_styles:log_lib",
        "//src/shared_styles:rng_lib",
        "@io_bazel_rules_closure//closure/library",
    ],
)

closure_js_library(
    name = "main_lib",
    srcs = ["main.js"],
    suppress = [
        "JSC_UNKNOWN_EXPR_TYPE",
    ],
    deps = [
        ":common_lib",
        "//src/shared_styles:heading_lib",
        "//src/shared_styles:log_lib",
        "//src/shared_styles:note_lib",
        "@io_bazel_rules_closure//closure/library",
    ],
)

closure_js_binary(
    name = "common_bin",
    entry_points = [
        "goog:agentydragon.permutedCloze.main",
    ],
    deps = [
        ":common_lib",
        ":main_lib",
        "//src/shared_styles:heading_lib",
    ],
)
