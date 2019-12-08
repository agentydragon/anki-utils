load("//src:anki_template.bzl", "anki_slug")

py_binary(
    name = "build_slug",
    srcs = ["build_slug.py"],
    visibility = ["//visibility:public"],
)

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
    name = "build_model_slug",
    srcs = ["build_model_slug.py"],
)

py_binary(
    name = "list_models",
    srcs = ["list_models.py"],
)
