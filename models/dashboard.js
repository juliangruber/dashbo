var redis = require('redis');
var client = redis.createClient();

Dashboard = {};

var parseStr = function(str) {
  return {
    id: str.split('|')[0],
    name: str.split('|')[1]
  }
}

Dashboard.getAll = function(cb) {
  client.smembers('dashboards', function(err, dashboards) {
    if (err) return cb(err);
    var formatted = [];
    dashboards.forEach(function(dashboard) {
      formatted.push(parseStr(dashboard));
    });
    cb(null, formatted);
  })
};

Dashboard.getRandom = function(cb) {
  client.srandmember('dashboards', function(err, dashboard) {
    if (err) return cb(err);
    cb(null, parseStr(dashboard));
  });
}

module.exports = Dashboard;