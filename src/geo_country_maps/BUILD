load("@io_bazel_rules_sass//:defs.bzl", "sass_binary", "sass_library")
load("//src:anki_template.bzl", "anki_model")

anki_model(
    name = "geo_country_maps",
    crowdanki_uuid = "8cf9f046-186c-11ea-9152-151b4dde761a",
    css = "style.css",
    templates = [
        "//src/geo_country_maps/flag",
        "//src/geo_country_maps/map",
    ],
    visibility = ["//src/deploy:__subpackages__"],
)

sass_binary(
    name = "sass",
    src = "style.scss",
    visibility = ["//src/deploy:__subpackages__"],
    deps = [
        "//src/shared_styles:card",
    ],
)
