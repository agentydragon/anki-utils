goog.module('agentydragon.tags');

/** @const {!Array<string>} */
const META_FAMILIES =
    [ "todo", "marked", "leech", "source", "persons::_my_network" ];

const HIERARCHY_SEPARATOR = '::';

/**
 * @param {string} tag
 * @param {string} parentTag
 * @return {boolean}
 */
function tagIsStrictlyUnderTag(tag, parentTag) {
  return tag.startsWith(parentTag + HIERARCHY_SEPARATOR);
}

/**
 * @param {string} tag
 * @param {string} parentTag
 * @return {boolean}
 */
function tagIsUnderTag(tag, parentTag) {
  return tag == parentTag || tagIsStrictlyUnderTag(tag, parentTag);
}

/**
 * @param {string} tag
 * @return {boolean}
 */
function tagIsMeta(tag) {
  return META_FAMILIES.some(family => tagIsUnderTag(tag, family));
}

/**
 * @param {string} tag
 * @return {!Array<string>}
 */
function splitTag(tag) { return tag.split(HIERARCHY_SEPARATOR); }

/**
 * @param {string} tag
 * @return {!Array<string>}
 */
function expandTag(tag) {
  const parts = splitTag(tag);
  let result = [];
  for (let i = 0; i < parts.length; i++) {
    result.push(parts.slice(0, i + 1).join(HIERARCHY_SEPARATOR));
  }
  return result;
}

/**
 * @param {!Array<string>} tags
 * @return {!Array<string>}
 */
function expandTags(tags) { return [...new Set(tags.flatMap(expandTag)) ]; }

/**
 * Yields suffixes, most specific first
 * @param {string} tag
 * @return {!Array<string>}
 */
function tagSuffixes(tag) {
  const parts = splitTag(tag);
  const suffixes = [];
  for (let firstPartIndex = parts.length - 1; firstPartIndex >= 0;
       --firstPartIndex) {
    const suffix = parts.slice(firstPartIndex).join(HIERARCHY_SEPARATOR);
    suffixes.push(suffix);
  }
  return suffixes;
}

exports = {
  expandTags,
  tagIsMeta,
  tagIsUnderTag,
  tagSuffixes,
  tagIsStrictlyUnderTag
};
