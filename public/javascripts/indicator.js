;(function() {
  var indicators = [];

  var updateIndicators = function(right) {
    for (var i = 0; i < indicators.length; i++) {
      indicators[i].style.right = right+'px';
    }
  };

  var hideIndicators = function(e) {
    if (e.toElement.className === 'indicator') return;
    for (var i = 0; i < indicators.length; i++) {
      indicators[i].style.display = 'none';
    }
  };

  var showIndicators = function() {
    for (var i = 0; i < indicators.length; i++) {
      indicators[i].style.display = 'block';
    }
  };

  var oldOnLoad = window.onload;
  window.onload = function() {
    if (oldOnLoad) oldOnLoad();

    var graphs = document.querySelectorAll('img');

    for (var i = 0; i < graphs.length; i++) {
      var indicator = document.createElement('span');
      indicator.className = 'indicator';
      indicator.innerHTML = ' ';
      graphs[i].parentElement.appendChild(indicator);
      indicators.push(indicator);

      (function(i) {
        graphs[i].onmousemove = function(e) {
          updateIndicators(e.target.width-e.offsetX+8);
        };

        graphs[i].onmouseout = hideIndicators;
        graphs[i].onmouseover = showIndicators;
      })(i);
    }
  }
})();