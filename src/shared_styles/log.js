goog.module('agentydragon.logging');

class Logger {
  constructor(note) {
    this.container = document.getElementById("agentydragon-log");
    this.loggingEnabled = (note.logEnabled == "true");
  }

  doLog(level, message, ...rest) {
    const messageElement = document.createElement("div");
    messageElement.className = level;
    messageElement.innerText = message;
    //    for (const item of rest) {
    //      // TODO: log better?
    //      messageElement.innerText += "; " + JSON.stringify(item));
    //    }
    this.container.appendChild(messageElement);
  }

  log(message, ...rest) {
    if (this.loggingEnabled) {
      this.doLog("info", message, ...rest);
    }
  }

  warn(message, ...rest) { this.doLog("warn", message, ...rest); }

  error(message, ...rest) { this.doLog("error", message, ...rest); }

  handleError(event) {
    this.error("Error " + event.lineno + ":" + event.colno + ": " +
               event.message);
  };

  installToConsole() {
    const me = this;
    window.addEventListener('error', e => me.handleError(e));

    MathJax.Hub.Register.MessageHook("Math Processing Error",
                                     message => me.error(message));
    MathJax.Hub.Register.MessageHook("TeX Jax - parse error",
                                     message => me.error(message));
  }
}

// TODO(prvak): Separately log user errors?

exports = {Logger};
