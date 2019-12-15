load("@io_bazel_rules_sass//:defs.bzl", "sass_binary")
load("@io_bazel_rules_webtesting//web:py.bzl", "py_web_test_suite")
load("//src:anki_template.bzl", "anki_model", "anki_template")
load("//src/ordinary:ordinary_template.bzl", "ordinary_template")

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
    html_in = "back_header.html",
    extra_js = ["common.js"],
)

ordinary_template(
    name = "front",
    html_in = "front_header.html",
    extra_js = ["common.js"],
)

sass_binary(
    name = "sass",
    src = "permuted_cloze.scss",
    # visibility = ["//src/deploy:__subpackages__"],
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
    local = True,
    data = [":front.expanded.html"],
    deps = [
        "@io_bazel_rules_webtesting//testing/web",
        "@rules_python//python/runfiles",
    ],
)
