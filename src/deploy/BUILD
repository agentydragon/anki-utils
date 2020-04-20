load("@rules_python//python:defs.bzl", "py_binary")
load("@my_deps//:requirements.bzl", "requirement")

py_binary(
    name = "build_card_slug",
    srcs = ["build_card_slug.py"],
    visibility = ["//src/models:__subpackages__"],
)

py_binary(
    name = "build_model_slug",
    srcs = ["build_model_slug.py"],
    visibility = ["//src/models:__subpackages__"],
)

py_binary(
    name = "build_slug",
    srcs = ["build_slug.py"],
    visibility = ["//src/models:__subpackages__"],
)

py_binary(
    name = "list_models",
    srcs = ["list_models.py"],
    data = ["//src/models:slug.json"],
    deps = [
        "@rules_python//python/runfiles",
        requirement("anki2"),
    ],
)

py_binary(
    name = "deploy",
    srcs = [":deploy.py"],
    data = ["//src/models:slug.json"],
    deps = ["@rules_python//python/runfiles"],
)
