py_binary(
    name = "build_slug",
    srcs = [":build_slug.py"],
)

genrule(
    name = "slug_genrule",
    srcs = [
        "//src/cloze:cloze_front.html",
        "//src/cloze:cloze_back.html",
        "//src/ordinary:ordinary.css",
    ],
    outs = ["slug.json"],
    cmd = " ".join([
        "$(location :build_slug)",
        "--cloze_uuid=760de475-186c-11ea-9152-151b4dde761a",
        "--cloze_html_front_path=$(location //src/cloze:cloze_front.html)",
        "--cloze_html_back_path=$(location //src/cloze:cloze_back.html)",
        "--cloze_css_path=$(location //src/ordinary:ordinary.css)",
        "--output_slug_path=$(location :slug.json)",
    ]),
    tools = [
        ":build_slug",
    ],
)
