# Rai's Anki utilities

This repository holds:

*   My toolbox for managing complex Anki note types.
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
        TODO(prvak): note type link

All of those require a bunch of HTML, CSS and JavaScript code that I want to run
in all of my note types. Anki only lets you edit the HTML and CSS per-template,
so if you have 10 note types, each with 2 cards, and you want to add 1 line of
HTML to all the templates, you will need to do 20 copy-pastes from your editor
into Anki.

`anki-utils` manages this source code of your note types, and allows you to
deploy changes you make to your note types in one command, saving all this
copy-pasting.

## Dependencies

*    Install Bazel.
*   ```bash
    pip3 install anki absl-py ankirspy protobuf
    ```

## Usage

First of all: **USE AT YOUR OWN RISK**, and **BACK UP YOUR ANKI DATABASE**.

Personally, before I do any deployment with `anki-utils`, I take a Git snapshot
of my collection using [Crowdanki](https://github.com/Stvad/CrowdAnki) so I can
be relatively confident I can bring things back if I break them.

Now with that out of the way. install the note type "Permuted Cloze" as I use it:

*   In Anki, create the new note type with your desired name, say "Rai's Permuted Cloze".
    TODO: better install story. script?
*   Create a Cloze note type in Anki and add the following fields:
    *   `Text`
    *   `Heading`
    *   `Seed`
    *   `Log`
    *   `Extra`
    *   TODO: add the rest; should link to the BUILD file
*   Close Anki.
*   Create a file named `config.yaml` containing:

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
*   Run the following command, replacing `<COLLECTION>` with the path to your
    `collection.anki2` file, and `<CONFIG>` with the path to the `config.yaml`
    file you created:

    ```bash
    bazel run //src/deploy -- \
      --alsologtostderr \
      --collection_path=<COLLECTION> \
      --cofig_yaml=<CONFIG>
    ```

    Be patient, the first run of this command will take a while, as it will need
    to set up a sandbox for building the note types.

    TODO: this should include check, diff, --nodry_run

*   Provided that this finishes successfully, you should now be able to use
    the note type. See instructions provided with each note type.

TODO: example with multiple deployed models

TODO: example with changing and rebuilding

## My note types

The actual note types are stored under `//src/models`.

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

TODO(prvak): Write tests interpreting the cards

[permuted_cloze]: /src/models/permuted_cloze/README.md
[keyboard_shortcut]: /src/models/keyboard_shortcut/README.md
