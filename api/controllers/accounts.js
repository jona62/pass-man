const express = require("express");
const router = express.Router();
const db = require("../models");
const passport = require("../middlewares/authentication");
const { Accounts } = db;

// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /posts
//    POST   /posts
//    GET    /posts/:id
//    PUT    /posts/:id
//    DELETE /posts/:id

router.get("/", (req, res) => {
  Accounts.findAll({}).then((accounts) => res.json(accounts));
});

router.post("/", (req, res) => {
  Accounts.create({
    website: req.body.website,
    username: req.body.username,
    password: req.body.password,
  })
    .then((account) => {
      res.status(201).json(account);
      console.log(account);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Accounts.findByPk(id).then((account) => {
    if (!account) {
      return res.sendStatus(404);
    }

    res.json(account);
  });
});

router.put("/", (req, res) => {
  const id = req.body.userId;
  Accounts.findAll({
    where: {
      userId: id,
    },
  }).then((account) => {
    if (!account) {
      return res.sendStatus(404);
    }

    account.website = req.body.website;
    account.username = req.body.username;
    account.password = req.body.password;
    account
      .save()
      .then((account) => {
        res.json(account);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
});

router.delete("/:id", passport.isAuthenticated(), (req, res) => {
  const { id } = req.params;
  Accounts.findByPk(id).then((post) => {
    if (!account) {
      return res.sendStatus(404);
    }

    account.destroy();
    res.sendStatus(204);
  });
});

module.exports = router;
