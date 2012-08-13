/*
 * GET home page.
 * GET graph page.
 */

/*
 * Model
 */

var zoom = { width: 300, height: 200 };

var Graph = require('../models/graph');
var Dashboard = require('../models/dashboard');

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
  Dashboard.getRandom(function(err, dashboard) {
    res.redirect('/dashboards/'+dashboard.id);
  });
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