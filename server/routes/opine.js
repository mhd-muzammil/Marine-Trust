// routes/opine.js
const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/opineController");

router.get("/", ctrl.list);
router.get("/:id", ctrl.getOne);
router.post("/", ctrl.create);
router.post("/:id/like", ctrl.like);
router.delete("/:id", ctrl.remove);

module.exports = router;
