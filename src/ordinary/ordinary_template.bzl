def _general_template_impl(name, html_headers, js_footers, html_out = None):
    if html_out == None:
        html_out = name + ".expanded_general_template.html"
    html_cat = "cat "
    for html_header in html_headers:
        html_cat += "$(location " + html_header + ") "
    js_cat = "cat "
    for js_footer in js_footers:
        js_cat += "$(location " + js_footer + ") "
    native.genrule(
        name = name,
        srcs = js_footers + html_headers,
        outs = [html_out],
        cmd = "\n".join([
            "(",
            ";\n".join([
                html_cat,
                "echo \"<script>\"",
                "echo \"(function() {\"",
                js_cat,
                "echo \"})();\" ",
                "echo \"</script>\"",
            ]),
            ") > \"$@\"",
        ]),
        visibility = ["//src/deploy:__subpackages__"],
    )

general_template = _general_template_impl

def _ordinary_template_impl(name, html_in, extra_js = [], html_out = None, html_prepend = [], html_append = []):
    _general_template_impl(
        name,
        html_headers = html_prepend + [
            "//src/shared_styles:common_header.html",
            html_in,
        ] + html_append,
        js_footers = [
            "//src/shared_styles:log.js",
            "//src/shared_styles:mathjax_log.js",
            "//src/shared_styles:heading.js",
        ] + extra_js,
        html_out = html_out,
    )

ordinary_template = _ordinary_template_impl
