var mongoose = require("mongoose");
var Quandary = require("../models/Quandary");

var quandaryController = {};

// Show list of quandaries
quandaryController.list = function(req, res) {
  Quandary.find({}).exec(function (err, quandaries) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/quandaries/index", {quandaries: quandaries});
    }
  });
};

// Show quandary by id
quandaryController.show = function(req, res) {
  Quandary.findOne({_id: req.params.id}).exec(function (err, quandary) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/quandaries/show", {quandary: quandary});
    }
  });
};

/// Create a new quandary ///
quandaryController.create = function(req, res) {
  res.render("../views/quandaries/create");
};

/// Save a new quandary ///
quandaryController.save = function(req, res) {
  var quandary = new Quandary(req.body);

  quandary.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/quandaries/create");
    } else {
      console.log("Successfully created an quandary.");
      res.redirect("/quandaries/show/"+quandary._id);
    }
  });
};

/// Edit a quandary ///
quandaryController.edit = function(req, res) {
  Quandary.findOne({_id: req.params.id}).exec(function (err, quandary) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/quandaries/edit", {quandary: quandary});
    }
  });
};

/// Update a quandary ///
quandaryController.update = function(req, res) {
  Quandary.findByIdAndUpdate(req.params.id, { $set: { quandary: req.body.quandary, pros: req.body.pros, cons: req.body.cons }}, { new: true }, function (err, quandary) {
    if (err) {
      console.log(err);
      res.render("../views/quandaries/edit", {quandary: req.body});
    }
    res.redirect("/quandaries/show/"+quandary._id);
  });
};

/// Delete a quandary ///
quandaryController.delete = function(req, res) {
  Quandary.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Quandary deleted!");
      res.redirect("/quandaries");
    }
  });
};

module.exports = quandaryController;
