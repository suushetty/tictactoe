// This is the index file that manages the routing of the incoming client's get and post requests

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('index', { title: 'TicTacToe' });
});

module.exports = router;

