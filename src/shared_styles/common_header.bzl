# TODO: fields must not contain whitespace
def _common_header_impl(name, fields):
    html_out = name + ".common_header.html"
    native.genrule(
        name = name,
        srcs = [],
        outs = [html_out],
        cmd = ("$(location //src/shared_styles:make_common_header) " +
               "--fields=" + ",".join(fields) + " " + "--output_file=\"$@\""),
        tools = ["//src/shared_styles:make_common_header"],
        visibility = ["//visibility:public"],
    )

common_header = _common_header_impl
