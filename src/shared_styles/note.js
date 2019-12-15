goog.module('agentydragon.note');

class Note {
  constructor(fields) { this.fields = fields; }

  get heading() { return this.fields.HEADING; }
  get tags() { return this.fields.TAGS; }
  get deck() { return this.fields.DECK; }
}

function obtainFieldFromId(id) {
  const content = document.getElementById(id).innerHTML;
  // If the model does not have the field, return null.
  if (content.indexOf("unknown field ") !== -1) {
    return null;
  }
  return content;
}

function obtainNote() {
  const fields = {
    HEADING : obtainFieldFromId("agentydragon-heading"),
    DECK : obtainFieldFromId("agentydragon-deck"),
    TAGS : obtainFieldFromId("agentydragon-tags"),
  };
  return new Note(fields);
}

exports = {
  Note,
  obtainNote
};
