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

genrule(
    name = "permuted_cloze_css_bundle_genrule",
    srcs = [
        "//src/shared_styles:shared_styles_css_bundle.css",
        "permuted_cloze.css",
    ],
    outs = ["permuted_cloze_css_bundle.css"],
    cmd = "\n".join([
        "(",
        "  cat $(location //src/shared_styles:shared_styles_css_bundle.css) && ",
        "  cat $(location permuted_cloze.css)",
        ") > \"$@\"",
    ]),
)
