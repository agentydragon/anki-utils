Rai = {};

Rai.logContainer = document.getElementById("agentydragon-log");

Rai.doLog = function(message, level) {
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
