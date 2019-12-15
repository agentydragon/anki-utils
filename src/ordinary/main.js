goog.module('agentydragon.ordinary.main');

const {installToConsole} = goog.require('agentydragon.logging');
const {obtainNote} = goog.require('agentydragon.note');
const {ensureHeading} = goog.require('agentydragon.heading');

installToConsole();
const note = obtainNote();
ensureHeading(note);
