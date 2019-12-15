goog.module('agentydragon.ordinary.main');

const {installToConsole} = goog.require('agentydragon.logging');
const {obtainNoteFields, ensureHeading} = goog.require('agentydragon.heading');

installToConsole();
obtainNoteFields();
ensureHeading();
