load("@io_bazel_rules_sass//:defs.bzl", "sass_binary", "sass_library")
load("//src:anki_template.bzl", "anki_model")
load("//src/shared_styles:common_header.bzl", "common_header")

common_header(
    name = "header",
    fields = [],
    visibility = ["//src/models/geo_country_maps:__subpackages__"],
)

anki_model(
    name = "geo_country_maps",
    css = "style.css",
    templates = [
        "//src/models/geo_country_maps/flag",
        "//src/models/geo_country_maps/map",
    ],
    visibility = ["//src/models:__subpackages__"],
)

sass_binary(
    name = "sass",
    src = "style.scss",
    deps = [
        "//src/shared_styles:card",
    ],
)
