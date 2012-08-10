
/*
 * GET home page.
 */

var graphs = [
  { id: 0, url: '/images/graph.png' },
  { id: 1, url: '/images/graph.png' },
  { id: 2, url: '/images/graph.png' },
  { id: 3, url: '/images/graph.png' },
  { id: 4, url: '/images/graph.png' },
  { id: 5, url: '/images/graph.png' }
];

// ZOOM
var zoom = {
  width: 300,
  height: 200
}
for (graph in graphs) {
  graphs[graph].url += '?width='+zoom.width+'&height='+zoom.height;
}

exports.index = function(req, res) {
  res.render('index', { title: 'Dashbo', graphs: graphs, zoom: zoom });
};

exports.graph = function(req, res) {
  res.render('graph', {
    title: 'Dashbo - Graph #'+req.params.id,
    graph: graphs[req.params.id] });
};