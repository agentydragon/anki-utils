goog.module('agentydragon.logging');

class Logger {
  constructor() {
    this.container = document.getElementById("agentydragon-log");
    this.loggingEnabled =
        (document.getElementById("agentydragon-log-enabled").innerHTML ==
         "true" /*"{{Log}}" == "true"*/);
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

  static handleError(event) {
    console.error("Error " + event.lineno + ":" + event.colno + ": " +
                  event.message);
  };

  installToConsole() {
    window.addEventListener('error', Logger.handleError);

    const me = this;

    let _log = console.log;
    let _warn = console.warn;
    let _error = console.error;

    console.log = function() {
      me.log(...arguments);
      _log.apply(console, arguments);
    };

    console.warn = function() {
      me.warn(...arguments);
      _warn.apply(console, arguments);
    };

    console.error = function() {
      me.error(...arguments);
      _error.apply(console, arguments);
    };
  }
}

const GLOBAL_LOGGER = new Logger();

// TODO(prvak): Separately log user errors?

exports = {
  Logger,
  GLOBAL_LOGGER
};
