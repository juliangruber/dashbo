var redis = require('redis');
var client = redis.createClient();

var template = 'plain';
var zoom = { width: 300, height: 200 };

var Graph = {};

Graph.base = process.env.GRAPHITE_URL || 'http://localhost:3000/images/graph.png';

Graph.template = '&template='+template;

Graph.getByDashboard = function(dashboardId, cb) {
  var graphs = [];
  client.smembers('dashboard:'+dashboardId+':graphs', function(err, graphIds) {
    if (err) return cb(err);
    var toFetch = graphIds.length;
    var graphs = [];
    if (toFetch > 0) {
      for (var i = 0; i < graphIds.length; i++) {
        (function(id) {
          Graph.get(id, function(err, graph) {
            if (err) {
              cb(err);
              cb = function(){};
              return;
            }
            graph.url += '&hideAxes=true';
            graphs.push(graph);
            if (!--toFetch) cb(null, graphs);
          });
        })(graphIds[i]);
      }
    } else {
      cb(null, graphs);
    }
  });
};

Graph.get = function(id, cb) {
  client.get('graph:'+id+':url', function(err, url) {
    if (err) return cb(err);
    cb(null, {
      id: id,
      url: Graph.base+url+Graph.template
    });
  });
};

module.exports = Graph;