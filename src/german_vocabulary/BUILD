load("//src:anki_template.bzl", "anki_model")

anki_model(
    name = "german_vocabulary",
    crowdanki_uuid = "7660bc2e-186c-11ea-9152-151b4dde761a",
    css = "//src/ordinary:ordinary.css",
    templates = [
        "//src/german_vocabulary/english_to_german",
        "//src/german_vocabulary/german_to_english",
    ],
    visibility = ["//src/deploy:__subpackages__"],
)
