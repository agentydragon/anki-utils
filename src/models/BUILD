load("//src:anki_template.bzl", "anki_slug")

anki_slug(
    name = "slug",
    models = [
        "//src/models/absl_include",
        "//src/models/basic_and_reversed",
        "//src/models/cloze",
        "//src/models/confusing_pair",
        "//src/models/english_term",
        "//src/models/geo_country_maps",
        "//src/models/geo_memrise_water",
        "//src/models/german/10k",
        "//src/models/german/memrise_4k",
        "//src/models/german/vocabulary",
        "//src/models/keyboard_shortcut",
        "//src/models/latex",
        "//src/models/latex_math",
        "//src/models/permuted_cloze",
        "//src/models/unicode",
        "//src/models/vim_golf",
    ],
    output_json = "slug.json",
    visibility = ["//src/deploy:__subpackages__"],
)
