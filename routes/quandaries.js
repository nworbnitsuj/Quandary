var express = require('express');
var router = express.Router();
var quandary = require("../controllers/quandaryController.js");

/// Get all quandaries ///
router.get('/', function(req, res) {
  quandary.list(req, res);
});

/// Get single quandary by id ///
router.get('/show/:id', function(req, res) {
  quandary.show(req, res);
});

/// Create quandary ///
router.get('/create', function(req, res) {
  quandary.create(req, res);
});

/// Save quandary ///
router.post('/save', function(req, res) {
  quandary.save(req, res);
});

/// Edit quandary ///
router.get('/edit/:id', function(req, res) {
  quandary.edit(req, res);
});

/// Edit update ///
router.post('/update/:id', function(req, res) {
  quandary.update(req, res);
});

/// Delete ///
router.post('/delete/:id', function(req, res, next) {
  quandary.delete(req, res);
});

module.exports = router;
