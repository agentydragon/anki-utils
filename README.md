# Rai's Anki utilities

Develop and share good Anki note types, and use them easily.

---

This repository holds:

*   My toolbox for managing complex Anki note types with source control.
*   The implementation of my note types, using this toolbox.

Its purpose is:

*   to let the Anki community use these note types in private or shared decks,
*   to allow relatively easily customizing these note types as needed,
*   to enable the community to create and share new useful note types.

## Why note type management

Anki note types allow entering custom HTML and CSS, and you can also run
JavaScript. Examples of how I use this in my note types are:

*   Esthetics:
    *   [Solarized colors](https://ethanschoonover.com/solarized/) following
        light/dark mode in [AnkiDroid](https://github.com/ankidroid/Anki-Android/).
    *   Setting card title based on tags (e.g.,
        `cs::tools::cpp::stdlib` &rarr; `C++ Standard Library`).
*   Function:
    *   [Permuted Cloze][permuted_cloze]: Permuting parts of the card to ensure
        I'm learning card content, not appearance.
    *   [Keyboard Shortcut][keyboard_shortcut]: Parsing a field containing e.g.
        `Ctrl+/ Shift+J` and rendering it wrapped in HTML tags and nicely styled.

All of those require a bunch of HTML, CSS and JavaScript code that I want to run
in all of my note types. Anki only lets you edit the HTML and CSS per-template,
so if you have 10 note types, each with 2 cards, and you want to add 1 line of
HTML to all the templates, you will need to do 20 copy-pastes from your editor
into Anki.

`anki-utils` manages this source code of your note types, and allows you to
deploy changes you make to your note types in one command, saving all this
copy-pasting.

## Dependencies

*   Install Bazel. See https://bazel.build/ for instructions.
    I use it for the build and test process.
*   Clone the repo, and `cd` into it. All `bazel` commands should be executed
    from your clone of this repository. (For those whose target to execute
    starts with `//src/`, it does not matter where in your cloned repo you are,
    as long as you are in a subdirectory of the cloned repo.)

## Usage

First of all: **USE AT YOUR OWN RISK**, and **BACK UP YOUR ANKI DATABASE**.

Personally, before I do any deployment with `anki-utils`, I take a Git snapshot
of my collection using [Crowdanki](https://github.com/Stvad/CrowdAnki) so I can
be relatively confident I can bring things back if I break them.

Now with that out of the way, to use `anki-utils`, you need to:

1.  Write a configuration file, then
2.  deploy it into your Anki collection.

### Configuration file

Create a configuration file named `config.yaml`. For example:

```yaml
models:
- model: //src/models/permuted_cloze:permuted_cloze
  mapping:
    name: Rai's Permuted Cloze
```

This file defines that the model defined in my repository in the
Bazel target `//src/models/permuted_cloze:permuted_cloze` should
be deployed in your Anki database into the model named `Rai's Permuted
Cloze`.

You can also have multiple mappings in the file:

```yaml
models:
- model: //src/models/permuted_cloze:permuted_cloze
  mapping:
    name: Rai's Permuted Cloze
- model: //src/models/keyboard_shortcut:keyboard_shortcut
  mapping:
    name: Rai's Keyboard Shortcut
```

### Deploying

Once you have a configuration file, you can *deploy* it. That means the models
will be built and your Anki collection will be updated to match them.

Deploying is done with the following command. Before running it, *close Anki*.
un it from your clone of the repo, and replace `<COLLECTION>` with the path to
your `collection.anki2` file and `<CONFIG>` with the path to the `config.yaml`
file you created:

```bash
bazel run //src/deploy -- \
    --alsologtostderr \
    --collection_path=<COLLECTION> \
    --cofig_yaml=<CONFIG>
```


Be patient, the first run of this command will take a while, as it will need
to set up a sandbox for building the note types.

TODO: Implement diffing, checks.

#### First run (without existing note types)

If the note types **do not yet exist** in your Anki collection, you'll need to
also pass `--add_if_missing` to allow the deploy program to create the new note
types.

If you later make some changes in the model definitions (i.e., the CSS or HTML),
you can keep the same `config.yaml` and run the deploy program again.

#### Dry run by default

By default, this command *will not actually do anything* - it will not actually
commit the changes to the Anki collection. To actually make it commit changes,
you need to pass `--nodry_run`.

Again, I urge you to **back up your collection** before running with
`--nodry_run`.

---

Provided that the deploy script finished successfully, the note types should
now be available in your collection.

TODO: Make permuted cloze deploy actually work.

TODO: example with changing and rebuilding

To learn how to use individual note types (e.g., what do the fields mean),
follow the links below.

## My note types

The actual note types are stored under `//src/models`.
Follow these links to learn how to use individual note types:

*   [Permuted Cloze][permuted_cloze]
*   [Keyboard Shortcut][keyboard_shortcut]

## Other features

Thanks to Bazel's extensibility, it was easy to run the note types through
preprocessors and compilers:

*   The CSS is written in [SASS](https://sass-lang.com/).
*   The JavaScript uses Google's
    [Closure Library](https://developers.google.com/closure/library).
*   Both are written into Anki minified.

The components can also be tested. Examples:
[JavaScript](/src/shared_styles/tags_test.js), [note type integration
test](/src/models/permuted_cloze/test.py).

## Caveats

### Card template editor shows errors

When you open some of my note types in the template editor, you might see
errors. Don't worry about them - the example content the template
editor uses is not valid as input for some of my note types.

TODO: Roam links in "Roam refs" field

TODO: Write tests interpreting the cards

[permuted_cloze]: /src/models/permuted_cloze/README.md
[keyboard_shortcut]: /src/models/keyboard_shortcut/README.md
