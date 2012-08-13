dashbo
======

`dashbo` displays graphs from your graphite server.
It is a simple dashboard system baked by `node.js` and `redis`.

Graph images are refreshed every 5s and a handy vertical indicator helps connecting data in graphs.

Screenshots
===========

![Indicators](https://raw.github.com/juliangruber/dashbo/master/screenshots/dashbo-indicators.png)
![Single](https://raw.github.com/juliangruber/dashbo/master/screenshots/dashbo-single.png)

Installation
============

```bash
# install node.js
# install redis
# clone git repository
npm install
node app.js
```

Administration
==============
At the moment, adding and removing graphs is done by communicating with redis directly over `redis-cli`.

* Add Dashboard: `sadd dashboards '<id>|<name>'`
* Add Graph to Dashboard: `set graph:<graphId>:url '<graphite-graph url (e.g. ?target=cpuUsage)>'` and `sadd dashboard:<id>:graphs <graphId>`

