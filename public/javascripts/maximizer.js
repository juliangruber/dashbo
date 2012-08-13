;(function() {

  var oldOnLoad = window.onload;
  window.onload = function() {
    if (oldOnLoad) oldOnLoad();
    maximize();
  }
  
  window.onresize = (function() {
    var lastResize = Date.now();
    
    return function() {
      lastResize = Date.now();
      setTimeout(function() {
        if (Date.now()-lastResize > 100) maximize();
      }, 100);
    }
  })();

  function maximize() {
    var el = document.querySelector('img');
    el.src += '&width='+el.width+'&height='+el.height;
  };
})();