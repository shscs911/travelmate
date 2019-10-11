const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Tourist = mongoose.model("Tourist");

router.get("/", (req, res) => {
  res.render("tourist/addOrEdit", {
    viewTitle: "Insert Touristplace"
  });
});

router.post("/", (req, res) => {
  if (req.body._id == "") insertRecord(req, res);
  else updateRecord(req, res);
});

function insertRecord(req, res) {
  var tourist = new Tourist();
  tourist.fullName = req.body.fullName;
  tourist.city = req.body.city;
  tourist.save((err, doc) => {
    if (!err) res.redirect("tourist/list");
    else console.log("Error during record insertion : " + err);
  });
}

function updateRecord(req, res) {
  Tourist.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("tourist/list");
      } else console.log("Error during record update : " + err);
    }
  );
}

router.get("/list", (req, res) => {
  Tourist.find((err, docs) => {
    if (!err) {
      res.render("tourist/list", {
        list: docs
      });
    } else {
      console.log("Error in retrieving tourist list :" + err);
    }
  });
});

router.get("/:id", (req, res) => {
  Tourist.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("tourist/addOrEdit", {
        viewTitle: "Update Touristplace",
        tourist: doc
      });
    }
  });
});

router.get("/delete/:id", (req, res) => {
  Tourist.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/tourist/list");
    } else {
      console.log("Error in tourist delete :" + err);
    }
  });
});

router.get("/search/:id", (req, res) => {
  Tourist.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("tourist/search", {
        viewTitle: "Touristplace Details",
        tourist: doc
      });
    }
  });
});

module.exports = router;
