# Log

My more complicated note types (like [Permuted
Cloze](/src/models/permuted_cloze/README.md)) have a lot of JavaScript, and
when the JavaScript is running inside Anki, it's relatively hard to debug.

If a card's JavaScript encounters a fatal error, it will complain about it
loudly in a log visible in the Anki review dialog.

TODO: add example image

If the note type has a field named `Log` and you set its value to the text
"true", it will enable verbose logging.

TODO: add example image
