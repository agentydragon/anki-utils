genrule(
    name = "cloze_front_genrule",
    srcs = [
        "//src/shared_styles:common_header.html",
        "cloze_front_header.html",
        "cloze.js",
        "//src/shared_styles:log.js",
    ],
    outs = ["cloze_front.html"],
    cmd = "\n".join([
        "(",
        "  cat $(location //src/shared_styles:common_header.html) && ",
        "  cat $(location cloze_front_header.html) && ",
        "  echo \"<script>\" && ",
        "  echo \"(function() {\" && ",
        "  cat $(location //src/shared_styles:log.js) && ",
        "  cat $(location cloze.js) && ",
        "  echo \"})();\" && ",
        "  echo \"</script>\"",
        ") > \"$@\"",
    ]),
)

genrule(
    name = "cloze_back_genrule",
    srcs = [
        "//src/shared_styles:common_header.html",
        "//src/shared_styles:log.js",
        "cloze_back_header.html",
        "cloze.js",
    ],
    outs = ["cloze_back.html"],
    cmd = "\n".join([
        "(",
        "  cat $(location //src/shared_styles:common_header.html) && ",
        "  cat $(location cloze_back_header.html) && ",
        "  echo \"<script>\" && ",
        "  echo \"(function() {\" && ",
        "  cat $(location //src/shared_styles:log.js) && ",
        "  cat $(location cloze.js) && ",
        "  echo \"})();\" && ",
        "  echo \"</script>\"",
        ") > \"$@\"",
    ]),
)
