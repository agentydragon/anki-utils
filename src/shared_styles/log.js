goog.module('agentydragon.logging');

class Logger {
  constructor() {
    this.container = document.getElementById("agentydragon-log");
    this.loggingEnabled = ("{{Log}}" == "true");
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

  static installToConsole() {
    window.addEventListener('error', Logger.handleError);

    const logger = new Logger();

    let _log = console.log;
    let _warn = console.warn;
    let _error = console.error;

    console.log = function() {
      logger.log(...arguments);
      _log.apply(console, arguments);
    };

    console.warn = function() {
      logger.warn(...arguments);
      _warn.apply(console, arguments);
    };

    console.error = function() {
      logger.error(...arguments);
      _error.apply(console, arguments);
    };
  }
}

Logger.installToConsole();

// TODO(prvak): This should log separately for user errors?
function reportError(message) { console.error(message); }

exports = {reportError};
