load("//src:anki_template.bzl", "anki_slug")

anki_slug(
    name = "slug",
    models = [
        "//src/models/basic_and_reversed",
        "//src/models/latex",
        "//src/models/latex_math",
        "//src/models/absl_include",
        "//src/models/cloze",
        "//src/models/english_term",
        "//src/models/confusing_pair",
        "//src/models/geo_country_maps",
        "//src/models/geo_memrise_water",
        "//src/models/german_10k",
        "//src/models/german_memrise_4k",
        "//src/models/german_vocabulary",
        "//src/models/keyboard_shortcut",
        "//src/models/permuted_cloze",
        "//src/models/unicode",
    ],
    output_json = "slug.json",
    visibility = ["//src/deploy:__subpackages__"],
)
