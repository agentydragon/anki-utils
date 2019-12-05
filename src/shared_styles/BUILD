package(
    default_visibility = ["//visibility:public"],
)

genrule(
    name = "shared_styles_css_bundle_genrule",
    srcs = [
        ":keyboard_shortcut.css",
        ":card.css",
    ],
    outs = ["shared_styles_css_bundle.css"],
    cmd = "\n".join([
        "(",
        "  cat $(location keyboard_shortcut.css) && ",
        "  cat $(location card.css)",
        ") > \"$@\"",
    ]),
)
