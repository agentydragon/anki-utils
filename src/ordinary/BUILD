load("@io_bazel_rules_sass//:defs.bzl", "sass_binary")

genrule(
    name = "ordinary_front_genrule",
    srcs = [
        "//src/shared_styles:common_header.html",
        "ordinary_front_header.html",
        "//src/shared_styles:log.js",
    ],
    outs = ["ordinary_front.html"],
    cmd = "\n".join([
        "(",
        "  cat $(location //src/shared_styles:common_header.html) && ",
        "  cat $(location ordinary_front_header.html) && ",
        "  echo \"<script>\" && ",
        "  echo \"(function() {\" && ",
        "  cat $(location //src/shared_styles:log.js) && ",
        "  echo \"})();\" && ",
        "  echo \"</script>\"",
        ") > \"$@\"",
    ]),
)

genrule(
    name = "ordinary_back_genrule",
    srcs = [
        "//src/shared_styles:common_header.html",
        "ordinary_back_header.html",
        "//src/shared_styles:log.js",
    ],
    outs = ["ordinary_back.html"],
    cmd = "\n".join([
        "(",
        "  cat $(location //src/shared_styles:common_header.html) && ",
        "  cat $(location ordinary_back_header.html) && ",
        "  echo \"<script>\" && ",
        "  echo \"(function() {\" && ",
        "  cat $(location //src/shared_styles:log.js) && ",
        "  echo \"})();\" && ",
        "  echo \"</script>\"",
        ") > \"$@\"",
    ]),
)

sass_binary(
    name = "ordinary",
    src = "ordinary.scss",
    deps = [
        "//src/shared_styles:card",
    ],
)
