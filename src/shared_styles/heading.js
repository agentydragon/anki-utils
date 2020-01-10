goog.module('agentydragon.heading');

const {Logger} = goog.require('agentydragon.logging');
const {Note} = goog.require('agentydragon.note');
const {
  expandTags,
  tagIsMeta,
  tagIsStrictlyUnderTag,
  tagIsUnderTag,
  tagSuffixes,
} = goog.require('agentydragon.tags');

/** @const {!Map<string, string>} */
const SPECIAL_TITLECASE = new Map([
  // To keep one heading per line, without wrapping (for easy sorting):
  // clang-format off
  [ 'ai-ml', 'AI & ML' ],
  [ 'ai-ml::adam', 'ADAM' ],
  [ 'anki::search', 'Anki search' ],
  [ 'anova', 'ANOVA' ],
  [ 'bash::test', 'Bash <code>test</code>' ],
  [ 'c::core', 'C core' ],
  [ 'c::stdlib', 'C standard library' ],
  [ 'c::stdlib::format', 'C - <code>print</code>/<code>scanf</code> formatting' ],
  [ 'cfar', 'CFAR' ],
  [ 'chromeos', 'ChromeOS' ],
  [ 'cinnamon-wm', 'Cinnamon WM' ],
  [ 'civ6', 'Civilization VI' ],
  [ 'cpp', 'C++' ],
  [ 'cpp::absl', 'C++ absl' ],
  [ 'cpp::core', 'C++ core' ],
  [ 'cpp::stl', 'C++ STL' ],
  [ 'cs::languages', 'Programming languages' ],
  [ 'css::selector::attribute', 'CSS attribute selectors' ],
  [ 'css::selector::pseudoclass', 'CSS pseudoclasses' ],
  [ 'czech-cases-latin', 'Latin names of Czech cases' ],
  [ 'date::format-string', '<code>date</code> format strings' ],
  [ 'diseases::stds', 'STDs' ],
  [ 'ffmpeg', '<code>ffmpeg</code>' ],
  [ 'ffmpeg::flags', '<code>ffmpeg</code> flags' ],
  [ 'gnome-terminal', 'GNOME Terminal' ],
  [ 'gnu-screen', 'GNU Screen' ],
  [ 'go::core', 'Go core' ],
  [ 'go::stdlib', 'Go standard library' ],
  [ 'go::stdlib::format', 'Go - <code>fmt</code> formats' ],
  [ 'google::bug-tracker', 'Google Issue Tracker' ],
  [ 'gsuite::docs', 'Google Docs' ],
  [ 'gsuite::drive', 'Google Drive' ],
  [ 'gsuite::sheets', 'Google Sheets' ],
  [ 'haml', 'HAML' ],
  [ 'html', 'HTML' ],
  [ 'html::entities', 'HTML entities' ],
  [ 'javascript', 'JavaScript' ],
  [ 'journalctl', '<code>journalctl</code>' ],
  [ 'latex', 'LaTeX' ],
  [ 'man::sections', '<code>man</code> sections' ],
  [ 'math::discrete', 'Discrete mathematics' ],
  [ 'mbti', 'MBTI' ],
  [ 'nato-phonetic', 'NATO phonetic alphabet' ],
  [ 'number-alphabet-mapping', 'Number &harr; alphabet mapping' ],
  [ 'numpy', 'NumPy' ],
  [ 'octave-matlab', 'Octave/Matlab' ],
  [ 'parts-of-speech', 'Parts of speech' ],
  [ 'posix-error', 'POSIX error codes' ],
  [ 'probability-statistics', 'Probability & Statistics' ],
  [ 'python::absl', 'Python absl' ],
  [ 'python::core', 'Python core' ],
  [ 'python::stdlib', 'Python standard library' ],
  [ 'python::stdlib::unittest', 'Python standard library - <code>unittest</code>' ],
  [ 'python::stdlib::unittest::assertions', 'Python standard library - <code>unittest</code> assertions' ],
  [ 'readline-bash', 'Readline/Bash' ],
  [ 'reinforcement-learning', 'Reinforcement learning' ],
  [ 'ruby::gems', 'Ruby gems' ],
  [ 'ruby::operator-pronounciation', 'Ruby ops pronounciation' ],
  [ 'tools::find', 'GNU find' ],
  [ 'tools::sort::flags', '<code>sort</code> flags' ],
  [ 'translate-english-german', 'Translate English &harr; German' ],
  [ 'url-encoding', 'URL encoding' ],
  [ 'vim::help', 'Vim help' ],
  [ 'vim::replace', 'Vim replace pattern' ],
  [ 'vim::search', 'Vim search' ],
  [ 'youtube', 'YouTube' ],
  [ 'zetasql', 'ZetaSQL' ],
  // clang-format on
]);

/** @const {!Map<string, string>} */
const CARD_SPOILER_TAGS = new Map([
  // Tags under 'geo:continent' are spoilers for the 'Flag' note type.
  [ 'Flag', 'geo::continent' ]
]);

const LIBRARY = "cs::libraries";
const PROGRAMMING_LANGUAGE = "cs::languages";

/**
 * @param {string} deck
 * @return {string}
 */
function getLastDeckComponent(deck) {
  const deckHierarchy = deck.split("::");
  return deckHierarchy[deckHierarchy.length - 1];
}

/**
 * @param {string} tag
 * @return {string}
 */
function titlecaseTag(tag) {
  if (SPECIAL_TITLECASE.has(tag)) {
    return SPECIAL_TITLECASE.get(tag);
  }
  return tag.split('-')
      .map(word => word.substring(0, 1).toUpperCase() + word.substring(1))
      .join(' ');
}

/**
 * @param {string} tag
 * @return {string}
 */
function headingFromTag(tag) {
  // If any suffix of the tag is in SPECIAL_TITLECASE, return it.
  const suffixes = tagSuffixes(tag);
  for (const suffix of suffixes) {
    if (SPECIAL_TITLECASE.has(suffix)) {
      return SPECIAL_TITLECASE.get(suffix);
    }
  }
  // The first suffix is the most specific one.
  return titlecaseTag(suffixes[0]);
}

/**
 * @param {!Note} note
 * @return {?string}
 */
function getHeadingFromHeadingField(note) {
  const headingField = note.heading;
  if (!headingField || headingField.length == 0) {
    return null;
  }
  return headingField;
}

/**
 * @param {string} lhs
 * @param {string} rhs
 * @return {number}
 */
function compareTags(lhs, rhs) {
  // Sort libraries before languages.
  const lhsLibrary = tagIsUnderTag(lhs, LIBRARY);
  const rhsLanguage = tagIsUnderTag(rhs, PROGRAMMING_LANGUAGE);
  const lhsLanguage = tagIsUnderTag(lhs, PROGRAMMING_LANGUAGE);
  const rhsLibrary = tagIsUnderTag(rhs, LIBRARY);
  if (lhsLibrary && rhsLanguage) {
    return -1;
  }
  if (lhsLanguage && rhsLibrary) {
    return 1;
  }
  return lhs.localeCompare(rhs);
}

/**
 * @param {!Note} note
 * @return {?string} Heading. Can contain unrestricted HTML.
 */
function getHeadingFromTags(note) {
  const tags = note.tags;
  if (!tags) {
    return null;
  }
  // Fully expand.
  const expandedTags = expandTags(tags.split(' '));
  /** @type {!Array<string>} */
  let individualTags = expandedTags.filter(tag => !tagIsMeta(tag));
  // Remove spoilers.
  if (note.card && CARD_SPOILER_TAGS.has(note.card)) {
    // TODO(prvak): This should also be anchored by the note type, but the
    // note type's UUID is not visible right now, and slug does not sync
    // the note type name...
    const spoilerTag = CARD_SPOILER_TAGS.get(note.card);
    individualTags =
        individualTags.filter(tag => !tagIsUnderTag(tag, spoilerTag));
  }
  // Remove non-leaf tags.
  /** @type {!function(string): boolean} */
  const tagIsNonleaf = tag => individualTags.some(
      candidateChild => tagIsStrictlyUnderTag(candidateChild, tag));
  /** @type {!function(string): boolean} */
  const tagIsLeaf = tag => !tagIsNonleaf(tag);
  const leafTags = individualTags.filter(tagIsLeaf);
  const sorted = leafTags.sort(compareTags);
  const candidateHeadings = sorted.map(headingFromTag);
  if (candidateHeadings.length == 0) {
    return null;
  }
  return candidateHeadings[0];
}

/**
 * @param {!Note} note
 * @return {?string}
 */
function headingFromLastDeckComponent(note) {
  const deck = note.deck;
  if (!deck || deck.length == 0) {
    return null;
  }
  return getLastDeckComponent(deck);
}

/**
 * @param {!Logger} logger
 * @param {!Note} note
 * @return {?string}
 */
function obtainHeadingHtml(logger, note) {
  const headingFromHeadingField = getHeadingFromHeadingField(note);
  const headerInContent = document.querySelector("#agentydragon-content h1");
  if (headerInContent) {
    if (headingFromHeadingField) {
      logger.warn("Both Heading field and inline heading specified.");
    }
    headerInContent.remove();
    return headerInContent.innerHTML;
  }
  // Use the heading specified in the note, if given.
  if (headingFromHeadingField) {
    return headingFromHeadingField;
  }
  const headingFromTags = getHeadingFromTags(note);
  if (headingFromTags) {
    return headingFromTags;
  }
  // Last resort: show the deck name
  const headingFromDeck = headingFromLastDeckComponent(note);
  if (headingFromDeck) {
    return headingFromDeck;
  }
  logger.error("no way to get a heading");
  return null;
}

/**
 * @param {!Logger} logger
 * @param {!Note} note
 */
function ensureHeading(logger, note) {
  const card = document.getElementById("agentydragon-card");
  const headingHtml = obtainHeadingHtml(logger, note);
  // There is another <h1> somewhere. Remove the empty placeholder.
  if (!card) {
    logger.error("unexpected: no .card found. cannot insert header");
    return;
  }

  // Move h2 out of content, if it's present.
  const subheaders = document.querySelectorAll("#agentydragon-content h2");
  if (subheaders.length == 1) {
    const h2 = subheaders[0];
    h2.remove();
    card.insertBefore(h2, card.firstChild);
  }

  const newHeader = document.createElement("h1");
  // TODO(prvak): Sanitize?
  newHeader.innerHTML = headingHtml;
  card.insertBefore(newHeader, card.firstChild);
}

exports = {
  tagIsUnderTag,
  compareTags,
  ensureHeading,
  getHeadingFromTags
};
// TODO(prvak): library should win over language
