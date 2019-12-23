goog.module('agentydragon.logging');

const {Note} = goog.require('agentydragon.note');

// TODO(prvak): Switch to closure library's logging subsystem

class Logger {
  /**
   * @param {!Note} note
   */
  constructor(note) {
    this.container = document.getElementById("agentydragon-log");
    this.loggingEnabled = (note.logEnabled == "true");
  }

  /**
   * @param {string} level
   * @param {string} message
   * @param {...*} rest
   */
  doLog(level, message, ...rest) {
    // TODO(prvak): More concrete type annotation for ...rest, here and
    // elsewhere.
    const messageElement = document.createElement("div");
    messageElement.className = level;
    messageElement.innerText = message;
    //    for (const item of rest) {
    //      // TODO: log better?
    //      messageElement.innerText += "; " + JSON.stringify(item));
    //    }
    this.container.appendChild(messageElement);
  }

  /**
   * @param {string} message
   * @param {...*} rest
   */
  log(message, ...rest) {
    if (this.loggingEnabled) {
      this.doLog("info", message, ...rest);
    }
  }

  /**
   * @param {string} message
   * @param {...*} rest
   */
  warn(message, ...rest) { this.doLog("warn", message, ...rest); }

  /**
   * @param {string} message
   * @param {...*} rest
   */
  error(message, ...rest) { this.doLog("error", message, ...rest); }

  /**
   * @param {!ErrorEvent} event
   */
  handleError(event) {
    this.error("Error " + event.lineno + ":" + event.colno + ": " +
               event.message);
  };

  installToConsole() {
    const me = this;
    window.addEventListener(
        'error', e => me.handleError(/** @type {!ErrorEvent} */ (e)));

    // AnkiWeb does not have MathJax.
    if (typeof MathJax !== "undefined") {
      MathJax.Hub.Register.MessageHook("Math Processing Error",
                                       message => me.error(message));
      MathJax.Hub.Register.MessageHook("TeX Jax - parse error",
                                       message => me.error(message));
    }
  }
}

exports = {Logger};
