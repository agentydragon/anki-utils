goog.module('agentydragon.ordinary.main');

const {GLOBAL_LOGGER, installToConsole} = goog.require('agentydragon.logging');
const {obtainNote} = goog.require('agentydragon.note');
const {ensureHeading} = goog.require('agentydragon.heading');

installToConsole();
const note = obtainNote();
ensureHeading(GLOBAL_LOGGER, note);
