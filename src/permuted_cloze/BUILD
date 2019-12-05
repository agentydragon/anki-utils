load("@io_bazel_rules_sass//:defs.bzl", "sass_binary", "sass_library")

genrule(
    name = "back_genrule",
    srcs = [
        "back_header.html",
        "common.js",
    ],
    outs = ["back.html"],
    cmd = "\n".join([
        "(",
        "  cat $(location back_header.html) && ",
        "  echo \"<script>\" && ",
        "  cat $(location common.js) && ",
        "  echo \"</script>\"",
        ") > \"$@\"",
    ]),
)

genrule(
    name = "front_genrule",
    srcs = [
        "front_header.html",
        "common.js",
    ],
    outs = ["front.html"],
    cmd = "\n".join([
        "(",
        "  cat $(location front_header.html) && ",
        "  echo \"<script>\" && ",
        "  cat $(location common.js) && ",
        "  echo \"</script>\"",
        ") > \"$@\"",
    ]),
)

sass_binary(
    name = "permuted_cloze",
    src = "permuted_cloze.scss",
    deps = [
        "//src/shared_styles:card",
    ],
)
