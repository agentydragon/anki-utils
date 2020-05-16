load("@rules_python//python:defs.bzl", "py_binary")
load("@rules_proto//proto:defs.bzl", "proto_library")
load("@com_google_protobuf//:protobuf.bzl", "py_proto_library")

py_binary(
    name = "build_slug",
    srcs = ["build_slug.py"],
    visibility = ["//src/models:__subpackages__"],
    deps = [":slug_py_pb2"],
)

py_binary(
    name = "list_models",
    srcs = ["list_models.py"],
    data = ["//src/models:slug.binarypb"],
    deps = [
        ":slug_py_pb2",
        "@rules_python//python/runfiles",
    ],
)

py_binary(
    name = "deploy",
    srcs = [":deploy.py"],
    data = ["//src/models:slug.binarypb"],
    deps = [
        ":slug_py_pb2",
        "@rules_python//python/runfiles",
    ],
)

py_proto_library(
    name = "slug_py_pb2",
    srcs = [":slug.proto"],
)
