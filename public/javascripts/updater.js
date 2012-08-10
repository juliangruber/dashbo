var graphNodes = document.querySelectorAll('img');

/**
 * Updater 
 */
var update = {};
update.interval = 5000;
update.perform = function() {
  for (var i = 0, len = graphNodes.length; i < len; i++) {
    graphNodes[i].src = graphNodes[i].src;
  };
}
setTimeout(function updateGraphs() {
  update.perform();
  setTimeout(updateGraphs, update.interval);
}, update.interval);