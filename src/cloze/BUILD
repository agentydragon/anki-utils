genrule(
    name = "cloze_front_genrule",
    srcs = [
        "cloze_front_header.html",
        "cloze.js",
    ],
    outs = ["cloze_front.html"],
    cmd = "\n".join([
        "(",
        "  cat $(location cloze_front_header.html) && ",
        "  echo \"<script>\" && ",
        "  cat $(location cloze.js) && ",
        "  echo \"</script>\"",
        ") > \"$@\"",
    ]),
)

genrule(
    name = "cloze_back_genrule",
    srcs = [
        "cloze_back_header.html",
        "cloze.js",
    ],
    outs = ["cloze_back.html"],
    cmd = "\n".join([
        "(",
        "  cat $(location cloze_back_header.html) && ",
        "  echo \"<script>\" && ",
        "  cat $(location cloze.js) && ",
        "  echo \"</script>\"",
        ") > \"$@\"",
    ]),
)
