load("//src:anki_template.bzl", "anki_slug")
load("@rules_python//python:defs.bzl", "py_binary")

anki_slug(
    name = "slug",
    models = [
        "//src/cloze",
        "//src/permuted_cloze",
        "//src/keyboard_shortcut",
    ],
    output_json = "slug.json",
)

py_binary(
    name = "build_slug",
    srcs = ["build_slug.py"],
)

py_binary(
    name = "list_models",
    srcs = ["list_models.py"],
    data = [":slug.json"],
    deps = ["@rules_python//python/runfiles"],
)

py_binary(
    name = "deploy",
    srcs = [":deploy.py"],
    data = [":slug.json"],
    deps = ["@rules_python//python/runfiles"],
)
