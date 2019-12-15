load("//src:anki_template.bzl", "anki_template")
load("//src/ordinary:ordinary_template.bzl", "ordinary_template")
load("@io_bazel_rules_webtesting//web:py.bzl", "py_web_test_suite")

anki_template(
    name = "front_to_back",
    answer_html = ":back",
    human_name = "Front -> Back",
    question_html = ":front",
    visibility = ["//src/models/basic_and_reversed:__subpackages__"],
)

ordinary_template(
    name = "front",
    html_in = "front.html",
)

ordinary_template(
    name = "back",
    html_in = "back.html",
)

py_web_test_suite(
    name = "heading_test",
    srcs = ["heading_test.py"],
    browsers = [
        "@io_bazel_rules_webtesting//browsers:chromium-local",
    ],
    local = True,
    data = [":front.expanded.html"],
    deps = [
        "@io_bazel_rules_webtesting//testing/web",
        "@rules_python//python/runfiles",
    ],
)
