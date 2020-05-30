# Permuted Cloze

The Permuted Cloze note type lets you create Cloze notes whose content is
automatically shuffled. This is useful when you want to make sure that you are
remembering the actual data the card wants you to remember.

For example, say that you are trying to make a card to learn to disambiguate
words that sound very similar - "effervescent" and "evanescent". You make a
Cloze note like this:

```
<ul>
  <li>
    e{{c1::fferv}}escent:
    {{c2::(of liquid) giving off bubbles; fizzy. (of person) enthusiastic,
    lively}}
  <li>
    e{{c1::van}}escent:
    {{c2::(literary) quickly fading (from memory, sight, existence)}}
</ul>
```

You add the card into your deck, and eventually you get the card right when it
shows up.

But sometimes, instead of actually memorizing the mapping, you may find yourself
instead memorizing "the first one is *effervescent*, the second one is
*evancescent*".

This means that if I flipped the order of the words on the card, you might
answer it incorrectly, because you have just learned the *form of the card*,
not the thing the card is trying to teach you.

The Permuted Cloze basically does this automatically. If you create a Permuted
Cloze note with the same content, it will generate the same 2 cards as a normal
Cloze note type, but when you review the cards, the order of the items in the
list will be randomized (with a new permutation every day). I hope that should
make it somewhat harder for your brain to memorize the "card cues" instead of
the info you're trying to teach it.

## Fields

### `Text`

The `Text` field contains the text with Clozed out content, and it must contain
a [permuted container](#Permuted_containers).

### `Heading`

See [shared documentation of `Heading` field](/src/shared_styles/heading.md).

### `Extra`

Similarly to the `Extra` field in Anki's built-in Cloze note type, the content
of the `Extra` field will be shown on the back side of every card.

Good uses of it include further explanation of content of the card.

## Advanced fields

You will usually not need those fields.

### `Log`

See [shared documentation of `Log` field](/src/shared_styles/log.md).

### `Seed`

Content in this field will be mixed into the PRNG seed. You can use the field
to check that the PRNG is actually correctly permuting your container by putting
in different values and seeing that they make the permutation change.

## Permuted containers

The `Text` of any Permuted Cloze note must contain a *permuted container*.
Contents of the *permuted container* will be pseudorandomly permuted when
reviewing.

### Permuted unordered list items

If your `Text` contains an `<ul>`, Permuted Cloze will permute the items of that
element.

For example:

```html
Some German words:
<ul>
<li>d{{c1::er}} {{c1::Mann}}: the {{c2::man}}
<li>d{{c1::ie}} {{c1::Frau}}: the {{c2::woman}}
</ul>
```

### Permuted table rows

If your card contains a `<tbody>` Permuted Cloze will permute the rows in the
`<tbody>`.

Note that just having a `<table>` is *not* enough - the rows to permute in the
table must be closed in `<tbody>`. If your table has a header, wrap it in
`<thead>` above the `<tbody>` - that way, in each permutation, the header will
be above the permuted body.

For example:

```
<table>
  <thead>
    <tr>
      <th>Name
      <th>Profession
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>L{{c5::inus}}
      <td>{{c1::programmer}}, {{c3::diver}}
    </tr>
    <tr>
      <td>R{{c6::ai}}
      <td>{{c1::programmer}}, {{c2::dragon}}
    </tr>
    <tr>
      <td>D{{c7::HH}}
      <td>{{c1::programmer}}, {{c4::racer}}
    </tr>
  </tbody>
</table>
```

### Permuted lines

TODO: document

## Caveats

### Permutation changes only once per day

The permutation on each card will only change once per day. This is due to a
limitation of Anki that cannot be solved without changing Anki, whether upstream
or via an addon. (The issue is that the JS running on the back of the card
must recalculate the permutation again, and it needs to match the permutation on
the front, but the front side JS cannot pass the actual permutation to the back
side JS and Anki does not have any special field with a "current review ID".)
