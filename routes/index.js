/*
 * GET home page.
 * GET graph page.
 */

/*
 * Model
 */
var base = process.env.GRAPHITE_URL || 'http://localhost:3000/images/graph.png';
var zoom = {
  width: 300,
  height: 200
}

var graphs = [
  { id: 0, url: '' },
  { id: 1, url: '' },
  { id: 2, url: '' },
  { id: 3, url: '' },
  { id: 4, url: '' },
  { id: 5, url: '' }
];

for (graph in graphs) {
  graphs[graph].url =
    base+
    graphs[graph].url+
    '?width='+zoom.width+'&height='+zoom.height;
}

/*
 * Routes
 */

exports.index = function(req, res) {
  res.render('index', { title: 'Dashbo', graphs: graphs, zoom: zoom });
};

exports.graph = function(req, res) {
  res.render('graph', {
    title: 'Dashbo - Graph #'+req.params.id,
    graph: graphs[req.params.id] });
};