const express = require("express");
const router = express.Router();
const db = require("../models");
const passport = require("../middlewares/authentication");
const { Accounts } = db;
const { encrypt, decrypt } = require("../crypto/ciper");

// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /posts
//    POST   /posts
//    GET    /posts/:id
//    PUT    /posts/:id
//    DELETE /posts/:id

router.get("/", (req, res) => {
  Accounts.findAll({}).then((accounts) => {
    // const account_res = accounts.map((account) => {
    //   const website = decrypt(account.dataValues.website);
    //   const username = decrypt(account.dataValues.username);
    //   const password = decrypt(account.dataValues.password);
    //   const { id, userId } = account.dataValues;
    //   return { id, website, username, password, userId };
    // });

    return res.json(accounts);
  });
});

router.post("/", (req, res) => {
  const { website, username, password, userId } = req.body;
  // const website = encrypt(req.body.website);
  // const username = encrypt(req.body.username);
  // const password = encrypt(req.body.password);
  // const userId = req.body.password;

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
    const website = decrypt(account.website);
    const username = decrypt(account.username);
    const password = decrypt(account.password);

    const { id, userId } = account;
    res.json({ id, website, username, password, userId });
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

    account.website = encrypt(req.body.website);
    account.username = encrypt(req.body.username);
    account.password = encrypt(req.body.password);
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
