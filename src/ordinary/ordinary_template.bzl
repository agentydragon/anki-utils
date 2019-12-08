def _ordinary_template_impl(name, html_in, html_out):
    native.genrule(
        name = name,
        srcs = [
            "//src/shared_styles:common_header.html",
            "//src/shared_styles:heading.js",
            "//src/shared_styles:log.js",
            html_in
        ],
        outs = [html_out],
        cmd = "\n".join([
            "(",
            ";\n".join([
                "cat $(location //src/shared_styles:common_header.html)",
                "cat $(location :" + html_in + ")",
                "echo \"<script>\"",
                "echo \"(function() {\"",
                "cat $(location //src/shared_styles:log.js)",
                "cat $(location //src/shared_styles:heading.js)",
                "echo \"})();\" ",
                "echo \"</script>\"",
            ]),
            ") > \"$@\"",
        ]),
        visibility = ["//src/deploy:__subpackages__"],
    )

ordinary_template = _ordinary_template_impl
