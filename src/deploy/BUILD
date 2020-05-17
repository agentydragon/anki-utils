load("@rules_python//python:defs.bzl", "py_binary")

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
    deps = ["@rules_python//python/runfiles"],
)

py_binary(
    name = "deploy",
    srcs = [":deploy.py"],
    data = ["//src/models:slug.json"],
    deps = ["@rules_python//python/runfiles"],
)
