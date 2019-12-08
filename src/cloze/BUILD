load("//src:anki_template.bzl", "anki_template", "anki_model")

anki_template(
    name = "cloze_tmpl",
    answer_html = ":cloze_back.html",
    human_name = "Cloze",
    question_html = ":cloze_front.html",
)

anki_model(
    name = "cloze",
    crowdanki_uuid = "760de482-186c-11ea-9152-151b4dde761a",
    css = "//src/ordinary:ordinary.css",
    templates = [
        ":cloze_tmpl",
    ],
    visibility = ["//src/deploy:__subpackages__"],
)

genrule(
    name = "cloze_front_genrule",
    srcs = [
        "//src/shared_styles:common_header.html",
        "//src/shared_styles:heading.js",
        "//src/shared_styles:log.js",
        "cloze_front_header.html",
    ],
    outs = ["cloze_front.html"],
    cmd = "\n".join([
        "(",
        "  cat $(location //src/shared_styles:common_header.html) && ",
        "  cat $(location cloze_front_header.html) && ",
        "  echo \"<script>\" && ",
        "  echo \"(function() {\" && ",
        "  cat $(location //src/shared_styles:log.js) && ",
        "  cat $(location //src/shared_styles:heading.js) && ",
        "  echo \"})();\" && ",
        "  echo \"</script>\"",
        ") > \"$@\"",
    ]),
    visibility = ["//src/deploy:__subpackages__"],
)

genrule(
    name = "cloze_back_genrule",
    srcs = [
        "//src/shared_styles:common_header.html",
        "//src/shared_styles:heading.js",
        "//src/shared_styles:log.js",
        "cloze_back_header.html",
    ],
    outs = ["cloze_back.html"],
    cmd = "\n".join([
        "(",
        "  cat $(location //src/shared_styles:common_header.html) && ",
        "  cat $(location cloze_back_header.html) && ",
        "  echo \"<script>\" && ",
        "  echo \"(function() {\" && ",
        "  cat $(location //src/shared_styles:log.js) && ",
        "  cat $(location //src/shared_styles:heading.js) && ",
        "  echo \"})();\" && ",
        "  echo \"</script>\"",
        ") > \"$@\"",
    ]),
    visibility = ["//src/deploy:__subpackages__"],
)
