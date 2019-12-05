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

genrule(
    name = "keyboard_shortcut_css_bundle_genrule",
    srcs = [
        "//src/shared_styles:shared_styles_css_bundle.css",
        "keyboard_shortcut.css",
    ],
    outs = ["keyboard_shortcut_css_bundle.css"],
    cmd = "\n".join([
        "(",
        "  cat $(location //src/shared_styles:shared_styles_css_bundle.css) && ",
        "  cat $(location keyboard_shortcut.css)",
        ") > \"$@\"",
    ]),
)
