load("@io_bazel_rules_sass//:defs.bzl", "sass_binary")
load("//src:anki_template.bzl", "anki_template", "anki_model")

anki_model(
    name = "permuted_cloze",
    crowdanki_uuid = "760de475-186c-11ea-9152-151b4dde761a",
    css = ":permuted_cloze.css",
    templates = [
        ":template",
    ],
    visibility = ["//src/deploy:__subpackages__"],
)

anki_template(
    name = "template",
    answer_html = ":back.html",
    human_name = "Cloze",
    question_html = ":front.html",
)

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
    name = "sass",
    src = "permuted_cloze.scss",
    visibility = ["//src/deploy:__subpackages__"],
    deps = [
        "//src/shared_styles:card",
    ],
)
