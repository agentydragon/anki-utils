load("//src:anki_template.bzl", "anki_model")

anki_model(
    name = "german_memrise_4k",
    crowdanki_uuid = "76a70b10-186c-11ea-9152-151b4dde761a",
    css = "//src/ordinary:ordinary.css",
    templates = [
        "//src/german_memrise_4k/english_to_german",
        "//src/german_memrise_4k/german_to_english",
    ],
    visibility = ["//src/deploy:__subpackages__"],
)
