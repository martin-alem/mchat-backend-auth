/**
 * @author Martin Alemajoh
 * @description This route handles request made to /ping route in-order to communicate the status of the server.
 * @date 7/19/2021
 */

const path = require("path");
const express = require("express");
const router = express.Router({ caseSensitive: true });

const Controller = require(path.join(__dirname, "../controllers/PingController"));

router.all("/", (req, res) => Controller.ping(req, res));
router.use(Controller.invalid);

module.exports = router;