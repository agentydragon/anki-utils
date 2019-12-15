goog.module('agentydragon.ordinary.main');

const {Logger} = goog.require('agentydragon.logging');
const {obtainNote} = goog.require('agentydragon.note');
const {ensureHeading} = goog.require('agentydragon.heading');

const logger = new Logger();
logger.installToConsole();
const note = obtainNote();
ensureHeading(logger, note);
