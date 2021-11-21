const express = require("express");
const router = express.Router();
const AccountController = require("../app/Controllers/AccountController");
const { validateRegister } = require("../../src/middleware/users");

router.post("/auth/register", validateRegister, AccountController.register);

module.exports = router;
