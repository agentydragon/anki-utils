goog.module('agentydragon.ordinary.main');

const {Logger} = goog.require('agentydragon.logging');
const {obtainNote} = goog.require('agentydragon.note');
const {ensureHeading} = goog.require('agentydragon.heading');

const note = obtainNote();
const logger = new Logger(note);
logger.installToConsole();
ensureHeading(logger, note);
