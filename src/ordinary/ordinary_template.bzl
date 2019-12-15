load("@npm_bazel_terser//:index.bzl", "terser_minified")

def _concat(files):
    if not files:
        return ""
    cat = "cat "
    for f in files:
        cat += "$(location " + f + ") "
    return cat

def _compose_template(
        name,
        html_headers,
        html_append,
        html_out,
        js_bundle):
    native.genrule(
        name = name,
        srcs = html_headers + html_append + [js_bundle],
        outs = [html_out],
        cmd = "\n".join([
            "(",
            ";\n".join([
                _concat(html_headers),
                "echo \"<script>\"",
                _concat([js_bundle]),
                "echo \"</script>\"",
                _concat(html_append),
            ]),
            # Stripping whitespace to make sure we give Anki a fully empty card
            # if wrapped in a {{#...}} {{/...}}
            ") | python -c 'import sys; sys.stdout.write(sys.stdin.read().strip())' > \"$@\"",
        ]),
        visibility = ["//src/deploy:__subpackages__"],
    )

def _general_template_impl(
        name,
        html_headers,
        js_footers,
        html_append = []):
    bundle_js_path = name + "_bundle.js"
    native.genrule(
        name = name + "_bundle_js",
        srcs = js_footers,
        outs = [bundle_js_path],
        cmd = "\n".join([
            "(",
            ";\n".join([
                "echo \"(function() {\"",
                _concat(js_footers),
                "echo \"})();\" ",
            ]),
            ") > \"$@\"",
        ]),
    )
    terser_minified(
        name = name + "_min",
        src = ":" + bundle_js_path,
    )

    # Minified target
    _compose_template(
        name = name,
        html_headers = html_headers,
        html_append = html_append,
        html_out = name + ".min.html",
        js_bundle = name + "_min.js",  #":" + name + "_min.js",
    )

    # Unminified target
    _compose_template(
        name = name + "_unminified",
        html_headers = html_headers,
        html_append = html_append,
        html_out = name + ".unminified.html",
        js_bundle = bundle_js_path,
    )

general_template = _general_template_impl

def _ordinary_template_impl(
        name,
        html_in,
        extra_js = [],
        html_prepend = [],
        **kwargs):
    _general_template_impl(
        name,
        html_headers = html_prepend + [
            "//src/shared_styles:common_header.html",
            html_in,
        ],
        js_footers = [
            "//src/shared_styles:log.js",
            "//src/shared_styles:mathjax_log.js",
            "//src/shared_styles:heading.js",
        ] + extra_js,
        **kwargs
    )

ordinary_template = _ordinary_template_impl
