;(function() {
  window.onload = maximize;
  
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
    var width = el.width;
    var height = el.height;

    var url = el.src;
    var oldQuery = url.split('?')[1];
    var segments = oldQuery.split('&');
    var query = '';
    segments.forEach(function(segment, i) {
      query += (i === 0)? '?' : '&';
      if (segment.search('width') > -1) return query += 'width='+el.width;
      if (segment.search('height') > -1) return query += 'height='+el.height;
      query += segment;
    });
    el.src = url.split('?')[0] + query;
  };
})();