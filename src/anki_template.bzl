AnkiTemplateInfo = provider(fields = [
    "human_name",
    "question_html",
    "answer_html",
])

def _anki_template_impl(ctx):
    return [AnkiTemplateInfo(
        human_name = ctx.attr.human_name,
        question_html = ctx.attr.question_html,
        answer_html = ctx.attr.answer_html,
    )]

anki_template = rule(
    attrs = {
        "human_name": attr.string(mandatory = True),
        "question_html": attr.label(
            mandatory = True,
            allow_files = True,
        ),
        "answer_html": attr.label(
            mandatory = True,
            allow_files = True,
        ),
    },
    implementation = _anki_template_impl,
)

AnkiModelInfo = provider(fields = [
    "css",
    "crowdanki_uuid",
    "templates",
])

def _anki_model_impl(ctx):
    templates = []
    for template in ctx.attr.templates:
        template_info = template[AnkiTemplateInfo]
        templates.append(template_info)

    return [
        AnkiModelInfo(
            crowdanki_uuid = ctx.attr.crowdanki_uuid,
            templates = templates,
            css = ctx.attr.css,
        ),
    ]

anki_model = rule(
    attrs = {
        "crowdanki_uuid": attr.string(mandatory = True),
        "templates": attr.label_list(
            mandatory = True,
            allow_empty = False,
        ),
        "css": attr.label(
            mandatory = True,
            allow_files = True,
        ),
    },
    implementation = _anki_model_impl,
)

def _anki_slug_impl(ctx):
    all_files = []
    models = []
    for model in ctx.attr.models:
        info = model[AnkiModelInfo]
        all_files.extend(info.css.files.to_list())
        templates = []
        for template in info.templates:
            q_html = template.question_html.files.to_list()
            a_html = template.answer_html.files.to_list()
            all_files.extend(q_html + a_html)
            templates.append(
                struct(
                    question_html = q_html[0].path,
                    answer_html = a_html[0].path,
                    human_name = template.human_name,
                ),
            )
        models.append(
            struct(
                crowdanki_uuid = info.crowdanki_uuid,
                templates = templates,
                css = info.css.files.to_list()[0].path,
            ),
        )
    args = ctx.actions.args()
    args.add("--models", struct(models = models).to_json())
    args.add("--output_file", ctx.outputs.output_json)
    if ctx.attr.log:
        args.add("--alsologtostderr")

    ctx.actions.run(
        inputs = all_files,
        outputs = [ctx.outputs.output_json],
        executable = ctx.executable.build_slug,
        arguments = [args],
    )

anki_slug = rule(
    attrs = {
        "models": attr.label_list(mandatory = True),
        "output_json": attr.output(mandatory = True),
        "build_slug": attr.label(
            executable = True,
            cfg = "host",
            allow_files = True,
            default =
                Label("//src/deploy:build_slug"),
        ),
        "log": attr.bool(default = False),
    },
    implementation = _anki_slug_impl,
)
