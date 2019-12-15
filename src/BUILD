load("@npm_bazel_terser//:index.bzl", "terser_minified")
load("@io_bazel_rules_webtesting//web:py.bzl", "py_web_test_suite")

terser_minified(
    name = "bundle.min",
    src = ":bundle.js",
)

py_web_test_suite(
    name = "web_test",
    srcs = ["web_test.py"],
    browsers = [
        "@io_bazel_rules_webtesting//browsers:chromium-local",
    ],
    local = True,
    deps = ["@io_bazel_rules_webtesting//testing/web"],
)
