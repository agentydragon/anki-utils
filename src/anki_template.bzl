AnkiTemplateInfo = provider(fields = [
    "human_name",
    "question_html",
    "answer_html",
    "slug",
])

def _anki_template_impl(ctx):
    fn = ctx.label.name + "_slug.json"
    fn_file = ctx.actions.declare_file(fn)
    args = ctx.actions.args()
    args.add("--question_html_file", ctx.attr.question_html.files.to_list()[0])
    args.add("--answer_html_file", ctx.attr.answer_html.files.to_list()[0])
    args.add("--output_file", fn_file)
    q_html = ctx.attr.question_html.files.to_list()
    a_html = ctx.attr.answer_html.files.to_list()
    ctx.actions.run(
        progress_message = "Building Anki card slug",
        inputs = q_html + a_html,
        outputs = [fn_file],
        executable = ctx.executable.build_card_slug,
        arguments = [args],
    )
    return [AnkiTemplateInfo(
        human_name = ctx.attr.human_name,
        question_html = ctx.attr.question_html,
        answer_html = ctx.attr.answer_html,
        slug = fn_file,
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
        "build_card_slug": attr.label(
            executable = True,
            cfg = "host",
            allow_files = True,
            default =
                Label("//src/deploy:build_card_slug"),
        ),
    },
    implementation = _anki_template_impl,
)

AnkiModelInfo = provider(fields = ["slug"])

def _anki_model_impl(ctx):
    templates = []
    all_files = []
    all_files.extend(ctx.attr.css.files.to_list())
    for template in ctx.attr.templates:
        all_files.append(template[AnkiTemplateInfo].slug)
        templates.append(
            struct(
                slug = template[AnkiTemplateInfo].slug.path,
                human_name = template[AnkiTemplateInfo].human_name,
            ),
        )

    fn = ctx.label.name + "_slug.json"
    fn_file = ctx.actions.declare_file(fn)
    args = ctx.actions.args()
    args.add("--templates_json", struct(templates = templates).to_json())
    args.add("--css", ctx.attr.css.files.to_list()[0])
    args.add("--fields", struct(fields = ctx.attr.fields).to_json())

    # TODO: also the fields?
    args.add("--output_file", fn_file)

    ctx.actions.run(
        progress_message = "Building Anki model slug",
        inputs = all_files,
        outputs = [fn_file],
        executable = ctx.executable.build_model_slug,
        arguments = [args],
    )

    return [AnkiModelInfo(slug = fn_file)]

anki_model = rule(
    attrs = {
        "templates": attr.label_list(
            mandatory = True,
            allow_empty = False,
        ),
        "css": attr.label(
            mandatory = True,
            allow_files = True,
        ),
        "fields": attr.string_list(mandatory = True, allow_empty = True),
        "build_model_slug": attr.label(
            executable = True,
            cfg = "host",
            allow_files = True,
            default =
                Label("//src/deploy:build_model_slug"),
        ),
    },
    implementation = _anki_model_impl,
)

def _anki_slug_impl(ctx):
    all_files = []
    models = []
    for model in ctx.attr.models:
        info = model[AnkiModelInfo]

        #all_files.extend(info.css.files.to_list())
        all_files.append(info.slug)
        #templates = []
        #for template in info.templates:
        #    q_html = template.question_html.files.to_list()
        #    a_html = template.answer_html.files.to_list()
        #    all_files.extend(q_html + a_html)
        #    templates.append(
        #        struct(
        #            question_html = q_html[0].path,
        #            answer_html = a_html[0].path,
        #            human_name = template[AnkiTemplateInfo].human_name,
        #        ),
        #    )

        # the template will need to insert particular fields!
        models.append(
            struct(
                target = "//" + model.label.package + ":" + model.label.name,
                slug = info.slug.path,
                #crowdanki_uuid = info.crowdanki_uuid,
                #model_name = info.model_name,
                #templates = templates,
                #css = info.css.files.to_list()[0].path,  #,
                #fields = info.fields,
                # NOTE: not putting in a field. maybe I should?
            ),
        )
    args = ctx.actions.args()
    args.add("--models", struct(models = models).to_json())
    args.add("--output_file", ctx.outputs.output_json)
    if ctx.attr.log:
        args.add("--alsologtostderr")

    ctx.actions.run(
        progress_message = "Building Anki slug from %d models" % len(ctx.attr.models),
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
