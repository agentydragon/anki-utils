def _concat(files):
    if not files:
        return ""
    cat = "cat "
    for f in files:
        cat += "$(location " + f + ") "
    return cat

def _general_template_impl(
        name,
        html_headers,
        js_binary,
        html_out = None,
        html_append = []):
    if html_out == None:
        html_out = name + ".expanded.html"
    native.genrule(
        name = name,
        srcs = [js_binary] + html_headers + html_append,
        outs = [html_out],
        cmd = "\n".join([
            "(",
            ";\n".join([
                _concat(html_headers),
                "echo \"<script>\"",
                _concat([js_binary]),
                "echo \"</script>\"",
                _concat(html_append),
            ]),
            # Stripping whitespace to make sure we give Anki a fully empty card
            # if wrapped in a {{#...}} {{/...}}
            ") | python -c 'import sys; sys.stdout.write(sys.stdin.read().strip())' > \"$@\"",
        ]),
        visibility = ["//src/deploy:__subpackages__"],
    )

general_template = _general_template_impl

def _ordinary_template_impl(
        name,
        html_in,
        html_header,
        js_binary = "//src/ordinary:main_bin.js",
        html_prepend = [],
        **kwargs):
    _general_template_impl(
        name,
        html_headers = html_prepend + [
            html_header,
            html_in,
        ],
        js_binary = js_binary,
        **kwargs
    )

ordinary_template = _ordinary_template_impl
