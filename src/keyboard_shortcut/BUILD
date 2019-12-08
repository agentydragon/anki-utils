load("@io_bazel_rules_sass//:defs.bzl", "sass_binary", "sass_library")
load("//src:anki_template.bzl", "anki_template", "anki_model")

anki_model(
    name = "keyboard_shortcut",
    crowdanki_uuid = "873f9847-186c-11ea-9152-151b4dde761a",
    css = ":keyboard_shortcut.css",
    templates = [
        ":effect_to_shortcut",
        ":shortcut_to_effect",
    ],
    visibility = ["//src/deploy:__subpackages__"],
)

anki_template(
    name = "shortcut_to_effect",
    answer_html = ":shortcut_to_effect_back.html",
    human_name = "Shortcut to Effect",
    question_html = ":shortcut_to_effect_front.html",
)

anki_template(
    name = "effect_to_shortcut",
    answer_html = ":effect_to_shortcut_back.html",
    human_name = "Effect to Shortcut",
    question_html = ":effect_to_shortcut_front.html",
)

genrule(
    name = "shortcut_to_effect_front_genrule",
    srcs = [
        "shortcut_to_effect_front_header.html",
        "common.js",
    ],
    outs = ["shortcut_to_effect_front.html"],
    cmd = "\n".join([
        "(",
        "  cat $(location shortcut_to_effect_front_header.html) && ",
        "  echo \"<script>\" && ",
        "  cat $(location common.js) && ",
        "  echo \"</script>\"",
        ") > \"$@\"",
    ]),
    visibility = ["//src/deploy:__subpackages__"],
)

genrule(
    name = "shortcut_to_effect_back_genrule",
    srcs = [
        "shortcut_to_effect_back_header.html",
        "common.js",
    ],
    outs = ["shortcut_to_effect_back.html"],
    cmd = "\n".join([
        "(",
        "  cat $(location shortcut_to_effect_back_header.html) && ",
        "  echo \"<script>\" && ",
        "  cat $(location common.js) && ",
        "  echo \"</script>\"",
        ") > \"$@\"",
    ]),
    visibility = ["//src/deploy:__subpackages__"],
)

genrule(
    name = "effect_to_shortcut_front_genrule",
    srcs = [
        "effect_to_shortcut_front_header.html",
        "common.js",
    ],
    outs = ["effect_to_shortcut_front.html"],
    cmd = "\n".join([
        "(",
        "  cat $(location effect_to_shortcut_front_header.html) && ",
        "  echo \"<script>\" && ",
        "  cat $(location common.js) && ",
        "  echo \"</script>\"",
        ") > \"$@\"",
    ]),
    visibility = ["//src/deploy:__subpackages__"],
)

genrule(
    name = "effect_to_shortcut_back_genrule",
    srcs = [
        "effect_to_shortcut_back_header.html",
        "common.js",
    ],
    outs = ["effect_to_shortcut_back.html"],
    cmd = "\n".join([
        "(",
        "  cat $(location effect_to_shortcut_back_header.html) && ",
        "  echo \"<script>\" && ",
        "  cat $(location common.js) && ",
        "  echo \"</script>\"",
        ") > \"$@\"",
    ]),
    visibility = ["//src/deploy:__subpackages__"],
)

sass_binary(
    name = "sass",
    src = "keyboard_shortcut.scss",
    visibility = ["//src/deploy:__subpackages__"],
    deps = [
        "//src/shared_styles:card",
    ],
)
