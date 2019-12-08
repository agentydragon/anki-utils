load("//src:anki_template.bzl", "anki_template", "anki_model")

anki_model(
    name = "basic_and_reversed",
    crowdanki_uuid = "a8359f82-ef5f-11e6-8d44-a44e31493108",
    css = "//src/ordinary:ordinary.css",
    templates = [
        ":front_to_back",
        ":back_to_front",
    ],
    visibility = ["//src/deploy:__subpackages__"],
)

anki_template(
    name = "front_to_back",
    answer_html = ":front_to_back_back.html",
    human_name = "Front -> Back",
    question_html = ":front_to_back_front.html",
)

anki_template(
    name = "back_to_front",
    answer_html = ":back_to_front_back.html",
    human_name = "Back -> Front",
    question_html = ":back_to_front_front.html",
)

genrule(
    name = "front_to_back_front",
    srcs = [
        "//src/shared_styles:common_header.html",
        "//src/shared_styles:heading.js",
        "//src/shared_styles:log.js",
        "front_to_back_front_header.html",
    ],
    outs = ["front_to_back_front.html"],
    cmd = "\n".join([
        "(",
        "  cat $(location //src/shared_styles:common_header.html) && ",
        "  cat $(location front_to_back_front_header.html) && ",
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
    name = "front_to_back_back",
    srcs = [
        "//src/shared_styles:common_header.html",
        "//src/shared_styles:heading.js",
        "//src/shared_styles:log.js",
        "front_to_back_back_header.html",
    ],
    outs = ["front_to_back_back.html"],
    cmd = "\n".join([
        "(",
        "  cat $(location //src/shared_styles:common_header.html) && ",
        "  cat $(location front_to_back_back_header.html) && ",
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
    name = "back_to_front_front",
    srcs = [
        "//src/shared_styles:common_header.html",
        "//src/shared_styles:heading.js",
        "//src/shared_styles:log.js",
        "back_to_front_front_header.html",
    ],
    outs = ["back_to_front_front.html"],
    cmd = "\n".join([
        "(",
        "  cat $(location //src/shared_styles:common_header.html) && ",
        "  cat $(location back_to_front_front_header.html) && ",
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
    name = "back_to_front_back",
    srcs = [
        "//src/shared_styles:common_header.html",
        "//src/shared_styles:heading.js",
        "//src/shared_styles:log.js",
        "back_to_front_back_header.html",
    ],
    outs = ["back_to_front_back.html"],
    cmd = "\n".join([
        "(",
        "  cat $(location //src/shared_styles:common_header.html) && ",
        "  cat $(location back_to_front_back_header.html) && ",
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
