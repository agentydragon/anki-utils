goog.module('agentydragon.permutedCloze.main');

const {ensureHeading} = goog.require('agentydragon.heading');
const {obtainNote} = goog.require('agentydragon.note');
const {Logger} = goog.require('agentydragon.logging');
const {shuffleCloze} = goog.require('agentydragon.permutedCloze.permutedCloze');

const note = obtainNote();
const logger = new Logger(note);
logger.installToConsole();
ensureHeading(logger, note);
const clozeContainer =
    document.getElementById("agentydragon-permuted-cloze-content");
shuffleCloze(note, clozeContainer, logger);
clozeContainer.className = "js-finished";
