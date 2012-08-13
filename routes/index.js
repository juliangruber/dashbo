/*
 * GET home page.
 * GET graph page.
 */

/*
 * Model
 */
var redis = require('redis');
var client = redis.createClient();

var template = 'plain';
var zoom = { width: 300, height: 200 };

var Graph = {};

Graph.base = process.env.GRAPHITE_URL || 'http://localhost:3000/images/graph.png';

Graph.zoom = '&width='+zoom.width+'&height='+zoom.height;
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
      url: Graph.base+url+Graph.zoom+Graph.template
    });
  });
};

Dashboard = {};

Dashboard.getAll = function(cb) {
  client.smembers('dashboards', function(err, dashboards) {
    if (err) return cb(err);
    var formatted = [];
    dashboards.forEach(function(dashboard) {
      formatted.push({
        id: dashboard.split('|')[0],
        name: dashboard.split('|')[1]
      });
    });
    cb(null, formatted);
  })
};


/*
 * Routes
 */

exports.dashboard = function(req, res) {
  var dashboards = [];
  var graphs = [];
  toFetch = 2;

  Dashboard.getAll(function(err, _dashboards) {
    if (err) throw err;
    dashboards = _dashboards;
    if (!--toFetch) render();
  });
  Graph.getByDashboard(req.params.id, function(err, _graphs) {
    if (err) throw err;
    graphs = _graphs;
    if (!--toFetch) render();
  });

  function render() {
    res.render('index', {
      title: 'Dashbo',
      dashboards: dashboards,
      graphs: graphs,
      zoom: zoom
    });
  };
};

exports.index = function(req, res) {
  res.redirect('/dashboards/1');
}

exports.graph = function(req, res) {
  Graph.get(req.params.id, function(err, graph) {
    if (err) throw err;
    res.render('graph', {
      title: 'Dashbo - Graph #'+req.params.id,
      graph: graph
    });
  });
};