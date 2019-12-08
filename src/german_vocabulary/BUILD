load("//src:anki_template.bzl", "anki_template", "anki_model")

anki_model(
    name = "german_vocabulary",
    crowdanki_uuid = "7660bc2e-186c-11ea-9152-151b4dde761a",
    css = "//src/ordinary:ordinary.css",
    templates = [
        ":english_to_german",
        ":german_to_english",
    ],
    visibility = ["//src/deploy:__subpackages__"],
)

anki_template(
    name = "english_to_german",
    answer_html = ":english_to_german_back.html",
    human_name = "English->German",
    question_html = ":english_to_german_front.html",
)

anki_template(
    name = "german_to_english",
    answer_html = ":german_to_english_back.html",
    human_name = "German->English",
    question_html = ":german_to_english_front.html",
)

genrule(
    name = "english_to_german_front",
    srcs = [
        "//src/shared_styles:common_header.html",
        "//src/shared_styles:heading.js",
        "//src/shared_styles:log.js",
        "english_to_german_front_header.html",
    ],
    outs = ["english_to_german_front.html"],
    cmd = "\n".join([
        "(",
        "  cat $(location //src/shared_styles:common_header.html) && ",
        "  cat $(location english_to_german_front_header.html) && ",
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
    name = "english_to_german_back",
    srcs = [
        "//src/shared_styles:common_header.html",
        "//src/shared_styles:heading.js",
        "//src/shared_styles:log.js",
        "english_to_german_back_header.html",
    ],
    outs = ["english_to_german_back.html"],
    cmd = "\n".join([
        "(",
        "  cat $(location //src/shared_styles:common_header.html) && ",
        "  cat $(location english_to_german_back_header.html) && ",
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
    name = "german_to_english_front",
    srcs = [
        "//src/shared_styles:common_header.html",
        "//src/shared_styles:heading.js",
        "//src/shared_styles:log.js",
        "german_to_english_front_header.html",
    ],
    outs = ["german_to_english_front.html"],
    cmd = "\n".join([
        "(",
        "  cat $(location //src/shared_styles:common_header.html) && ",
        "  cat $(location german_to_english_front_header.html) && ",
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
    name = "german_to_english_back",
    srcs = [
        "//src/shared_styles:common_header.html",
        "//src/shared_styles:heading.js",
        "//src/shared_styles:log.js",
        "german_to_english_back_header.html",
    ],
    outs = ["german_to_english_back.html"],
    cmd = "\n".join([
        "(",
        "  cat $(location //src/shared_styles:common_header.html) && ",
        "  cat $(location german_to_english_back_header.html) && ",
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
