goog.module('agentydragon.ordinary.main');

const {Logger} = goog.require('agentydragon.logging');
const {ensureHeading} = goog.require('agentydragon.heading');
const {obtainNote} = goog.require('agentydragon.note');

const note = obtainNote();
const logger = new Logger(note);
logger.installToConsole();
ensureHeading(logger, note);
