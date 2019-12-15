Rai = {};

Rai.logContainer = document.getElementById("agentydragon-log");

Rai.doLog = function(message, level) {
  const messageElement = document.createElement("div");
  messageElement.className = level;
  messageElement.innerText = message;
  Rai.logContainer.appendChild(messageElement);
};

Rai.doLog2 = function(level, message, ...rest) {
  const messageElement = document.createElement("div");
  messageElement.className = level;
  messageElement.innerText = message;
  Rai.logContainer.appendChild(messageElement);
};

Rai.reportError = function(message) { Rai.doLog(message, "error"); };

Rai.handleError = function(event) {
  Rai.reportError("Error " + event.lineno + ":" + event.colno + ": " +
                  event.message);
};

window.addEventListener('error', Rai.handleError);

Rai.log = function(message) {
  if ("{{Log}}" == "true") {
    Rai.doLog(message, "info");
  }
};

(function() {
let _log = console.log;
let _error = console.error;
let _warning = console.warning;

console.error = function() { _error.apply(console, arguments); };

// console.log = function(message) { _log.apply(console, arguments); };
//
// console.warning = function(message) { _log.apply(console, arguments); };
});
