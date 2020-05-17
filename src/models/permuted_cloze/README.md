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
