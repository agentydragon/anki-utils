load("@io_bazel_rules_sass//:defs.bzl", "sass_binary", "sass_library")

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
)

sass_binary(
    name = "keyboard_shortcut",
    src = "keyboard_shortcut.scss",
    deps = [
        "//src/shared_styles:card",
    ],
)
