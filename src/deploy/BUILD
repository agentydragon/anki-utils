py_binary(
    name = "build_slug",
    srcs = ["build_slug.py"],
)

genrule(
    name = "slug_genrule",
    srcs = [
        # Cloze
        "//src/cloze:cloze_front.html",
        "//src/cloze:cloze_back.html",
        "//src/ordinary:ordinary.css",
        # Permuted Rows Cloze
        "//src/permuted_cloze:front.html",
        "//src/permuted_cloze:back.html",
        "//src/permuted_cloze:permuted_cloze.css",
    ],
    outs = ["slug.json"],
    cmd = " ".join([
        "$(location :build_slug)",
        # Cloze
        "--cloze_uuid=760de482-186c-11ea-9152-151b4dde761a",
        "--cloze_html_front_path=$(location //src/cloze:cloze_front.html)",
        "--cloze_html_back_path=$(location //src/cloze:cloze_back.html)",
        "--cloze_css_path=$(location //src/ordinary:ordinary.css)",
        # Permuted Rows Cloze
        "--permuted_cloze_uuid=760de475-186c-11ea-9152-151b4dde761a",
        "--permuted_cloze_html_front_path=$(location //src/permuted_cloze:front.html)",
        "--permuted_cloze_html_back_path=$(location //src/permuted_cloze:back.html)",
        "--permuted_cloze_css_path=$(location //src/permuted_cloze:permuted_cloze.css)",
        "--output_slug_path=$(location :slug.json)",
    ]),
    tools = [
        ":build_slug",
    ],
)

py_binary(
    name = "list_models",
    srcs = ["list_models.py"],
)
