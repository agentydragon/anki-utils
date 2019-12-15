goog.module('agentydragon.permutedCloze.main');

const {ensureHeading} = goog.require('agentydragon.heading');
const {obtainNote} = goog.require('agentydragon.note');
const {Logger} = goog.require('agentydragon.logging');
const {shuffleCloze} = goog.require('agentydragon.permutedCloze.permutedCloze');

const logger = new Logger();
logger.installToConsole();
const note = obtainNote();
ensureHeading(logger, note);
const clozeContainer =
    document.getElementById("agentydragon-permuted-cloze-content");
shuffleCloze(clozeContainer, logger);
clozeContainer.className = "js-finished";
