# Rai's Anki utilities

TODO: Permuted Cloze, Keyboard Shortcut note types

TODO(prvak)

TODO: seed is based on X

## Building

```
bazel build //src/...
```

Card HTML templates will appear in `bazel-genfiles/src/*.html`.

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

3. Open the card template editor for the note type.

4. Copy-and-paste the generated files into the card template.

   * **Front side**:

     Copy the content of `bazel-genfiles/src/permuted_cloze/front.html` into
     your clipboard. On Linux, you can run:

     ```
     cat bazel-genfiles/src/permuted_cloze/front.html | xclip
     ```

     Paste it into the front side template.

   * **Back side**:

     Repeat the same for the back side with
     `bazel-genfiles/src/permuted_cloze/back.html`. You can use:

     ```
     cat bazel-genfiles/src/permuted_cloze/back.html | xclip
     ```

     Paste it into the back side template.

   * **CSS**:

     Repeat the same for the back side with
     `src/permuted_cloze/common.css`. You can use:

     ```
     cat bazel-bin/src/permuted_cloze/permuted_cloze.css | xclip
     ```

     Paste it into the shared CSS.

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

TODO: bazel build

TODO:

```
cat bazel-bin/src/keyboard_shortcut/effect_to_shortcut_front.html | xclip
# --> paste into "effect->shortcut" front

cat bazel-bin/src/keyboard_shortcut/effect_to_shortcut_back.html | xclip
# --> paste into "effect->shortcut" back

cat bazel-bin/src/keyboard_shortcut/shortcut_to_effect_front.html | xclip
# --> paste into "shortcut->effect" front

cat bazel-bin/src/keyboard_shortcut/shortcut_to_effect_back.html | xclip
# --> paste into "shortcut->effect" back

cat bazel-bin/src/keyboard_shortcut/keyboard_shortcut.css | xclip
# --> paste into CSS
```

TODO: installation instructions


Ordinary:

```
cat bazel-bin/src/ordinary/ordinary.css | xclip
# --> paste into CSS

cat bazel-bin/src/cloze/cloze_front.html | xclip
cat bazel-bin/src/cloze/cloze_back.html | xclip
```

TODO: Add auto-title logic into Permuted Cloze
