var express = require('express');
var router = express.Router();
const hasPermission = require('../services/hasPermission');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/news', hasPermission('951a9109-7201-4f79-beaf-f7791097bdb2','news'), function (req, res, next) {
  res.json({ news: [ { title: "news item", description: "news description" }]});
});

router.get('/api/weather', hasPermission('951a9109-7201-4f79-beaf-f7791097bdb2','weather'), function (req, res, next) {
  res.json({ weather: { description: "weather description", high: 30, low: 10 }});
});

module.exports = router;
