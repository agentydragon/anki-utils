# Rai's Anki utilities

TODO: Permuted Cloze, Keyboard Shortcut note types

TODO(prvak)

TODO: seed is based on X

## Permuted Cloze

### Installing the "Permuted Cloze" note type

TODO: better install story. script?

1. Build:

  ```
  bazel build //src/permuted_cloze/...
  ```

2. Create a new Cloze type in Anki.
   By default, it should have the fields "Text" (for the Cloze content) and
   "Extra" (for extra content to be shown after answering).
   Make sure those fields have been created. Additionally, add the following
   extra fields:

   *  `Seed`
   *  `Log`

After you finish these steps, the preview of the card (in the template editor)
will show errors. Don't worry about them - the example content the template
editor uses is not valid, so the JavaScript doesn't know how to permute it.

The note type should now be ready for use.

### Creating "Permuted Cloze" cards

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

### Advanced

#### Extra PRNG seeding

Anything you put into the `Seed` field will be used to seed the PRNG that
shuffles the card. You can use it to force two cards to start from a different
seed, or to check that varying the seed will indeed change the card order.

#### Logging

If you set the `Log` field to `true`, the JavaScript will write out visible
logs.

## Keyboard Shortcut

### Installing

TODO:

TODO: installation instructions

## Deploying templates and styles

```bash
blaze run //src/deploy -- \
  --alsologtostderr \
  --collection_path=/home/agentydragon/dropbox/anki/agentydragon
```
