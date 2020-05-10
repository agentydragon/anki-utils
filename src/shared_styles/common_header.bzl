# TODO: fields must not contain whitespace
def _common_header_impl(ctx):
    #    html_out = ctx.attr.name + ".common_header.html"
    #
    #html_out_file = ctx.actions.declare_file(html_out)

    args = ctx.actions.args()
    args.add("--fields", struct(fields = ctx.attr.fields).to_json())
    args.add("--output_file", ctx.outputs.output_html)
    #if ctx.attr.log:
    #    args.add("--alsologtostderr")

    ctx.actions.run(
        inputs = [],
        outputs = [ctx.outputs.output_html],  #html_out_file],
        executable = ctx.executable.make_common_header,
        arguments = [args],
    )

common_header = rule(
    _common_header_impl,
    attrs = {
        "fields": attr.string_list(mandatory = True, allow_empty = True),
        "make_common_header": attr.label(
            executable = True,
            cfg = "host",
            allow_files = True,
            default =
                Label("//src/shared_styles:make_common_header"),
        ),
    },
    outputs = {"output_html": "%{name}.common_header.html"},
)
