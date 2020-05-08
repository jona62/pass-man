const express = require("express");
const router = express.Router();
const db = require("../models");
const passport = require("../middlewares/authentication");
const { Accounts } = db;
const AES = require("crypto-js/aes");
const secret = process.env.secret;

// const AES_ = require("../crypto/AES_");

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
  const { website, username, password, userId } = req.body;
  // const encrypted_website = AES.encrypt(req.body.website, secret);
  // const encrypted_username = AES.encrypt(req.body.username, secret);
  // const encrypted_password = AES.encrypt(req.body.password, secret);
  // const encrypted_userId = AES.encrypt(req.body.userId, secret);

  Accounts.create({
    website: website,
    username: username,
    password: password,
    userId: userId,
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
  const id = req.body.id;
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
  Accounts.findByPk(id).then((account) => {
    if (!account) {
      return res.sendStatus(404);
    }

    account.destroy();
    res.sendStatus(204);
  });
});

module.exports = router;
