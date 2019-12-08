load("@io_bazel_rules_sass//:defs.bzl", "sass_binary")

genrule(
    name = "back_genrule",
    srcs = [
        "back_header.html",
        "common.js",
        "//src/shared_styles:log.js",
        "//src/shared_styles:heading.js",
        "//src/shared_styles:common_header.html",
    ],
    outs = ["back.html"],
    cmd = "\n".join([
        "(",
        "  cat $(location //src/shared_styles:common_header.html) && ",
        "  cat $(location back_header.html) && ",
        "  echo \"<script>\" && ",
        "  echo \"(function() {\" && ",
        "  cat $(location //src/shared_styles:log.js) && ",
        "  cat $(location //src/shared_styles:heading.js) && ",
        "  cat $(location common.js) && ",
        "  echo \"})();\" && ",
        "  echo \"</script>\"",
        ") > \"$@\"",
    ]),
    visibility = ["//src/deploy:__subpackages__"],
)

genrule(
    name = "front_genrule",
    srcs = [
        "front_header.html",
        "common.js",
        "//src/shared_styles:heading.js",
        "//src/shared_styles:log.js",
        "//src/shared_styles:common_header.html",
    ],
    outs = ["front.html"],
    cmd = "\n".join([
        "(",
        "  cat $(location //src/shared_styles:common_header.html) && ",
        "  cat $(location front_header.html) && ",
        "  echo \"<script>\" && ",
        "  echo \"(function() {\" && ",
        "  cat $(location //src/shared_styles:log.js) && ",
        "  cat $(location //src/shared_styles:heading.js) && ",
        "  cat $(location common.js) && ",
        "  echo \"})();\" && ",
        "  echo \"</script>\"",
        ") > \"$@\"",
    ]),
    visibility = ["//src/deploy:__subpackages__"],
)

sass_binary(
    name = "permuted_cloze",
    src = "permuted_cloze.scss",
    visibility = ["//src/deploy:__subpackages__"],
    deps = [
        "//src/shared_styles:card",
    ],
)
