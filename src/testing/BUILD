load("@my_deps//:requirements.bzl", "requirement")

py_library(
    name = "card_testcase",
    srcs = ["card_testcase.py"],
    deps = [
        "@io_bazel_rules_webtesting//testing/web",
        "@rules_python//python/runfiles",
        requirement("anki"),
        # Required transitively by Anki.
        requirement("protobuf"),
        requirement("ankirspy")
    ],
    visibility = ["//visibility:public"],
    testonly = True,
)
