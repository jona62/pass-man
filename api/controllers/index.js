const express = require("express");
const router = express.Router();

// Load each controller
const authController = require("./auth.js");
const accountsController = require("./accounts.js");
const usersController = require("./users.js");
const appConfigController = require("./appConfig.js");

// Mount each controller under a specific route. These
// will be prefixes to all routes defined inside the controller
router.use("/auth", authController);
router.use("/accounts", accountsController);
router.use("/users", usersController);
router.use("/application-configuration", appConfigController);

module.exports = router;
