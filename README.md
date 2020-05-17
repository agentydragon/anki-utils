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
    *   Permuted Cloze: Permuting parts of the card to ensure I'm learning card
        content, not appearance. TODO: note type link
    *   Keyboard Shortcut: Parsing a field containing e.g. `Ctrl+/ Shift+J`
        and rendering it wrapped in HTML tags and nicely styled.
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

```bash
pip3 install anki absl-py ankirspy protobuf
```

## Usage

First of all: **USE AT YOUR OWN RISK**, and **BACK UP YOUR ANKI DATABASE**.

Personally, before I do any deployment with `anki-utils`, I take a Git snapshot
of my collection using [Crowdanki](https://github.com/Stvad/CrowdAnki) so I can
be relatively confident I can bring things back if I break them.

Now with that out of the way. install the note type "Permuted Cloze" as I use it:

*   In Anki, create the new note type with your desired name, say "Rai's Permuted Cloze".
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

*   Provided that this finishes successfully, you should now be able to use
    the note type. See instructions provided with each note type.

TODO: example with multiple deployed models

## My note types

The actual note types are stored under `//src/models`.

## Permuted Cloze

The Permuted Cloze note type solves the problem that TODO

### Fields

*   `Text`
*   `Heading`
*   `Seed`
*   `Log`
*   `Extra`
*   TODO: add the rest

### Usage

#### Permuted unordered list items

If your card contains an `<ul>` Permuted Cloze will permute the items of that
element.

For example, this HTML:

```
These are the:
<ul>
<li>{{c1::xxx}}: {{c2::yyy}}
<li>{{c1::dsasf}}: {{c2::safa}}
</ul>
Foobar.
```

TODO

#### Permuted table rows

If your card contains an `<tbody>` Permuted Cloze will permute the items of that
element.

For example, this HTML:

```
TODO
```

#### Permuted lines

TODO

### Advanced usage

#### Extra PRNG seeding

Anything you put into the `Seed` field will be used to seed the PRNG that
shuffles the card. You can use it to force two cards to start from a different
seed, or to check that varying the seed will indeed change the card order.

#### Logging

If you set the `Log` field to `true`, the JavaScript will write out visible
logs.

### Implementation details

TODO: seed is based on X

## Keyboard Shortcut

### Fields

TODO

### Usage

TODO

## Caveats

### Card template editor shows errors

When you open some of my note types in the template editor, you might see
errors. Don't worry about them - the example content the template
editor uses is not valid as input for some of my note types.

TODO: Roam links in "Roam refs" field

TODO(prvak): Write tests interpreting the cards

TODO: better install story. script?


The note type should now be ready for use.
