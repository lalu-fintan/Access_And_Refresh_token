const express = require("express");
const {
  getData,
  getById,
  postData,
  updateData,
  deleteData,
} = require("../controller/userController");
const verifyToken = require("../validator/verifyToken");

const router = express.Router();

router.get("/", getData);
router.get("/:id", getById);
router.post("/", verifyToken("admin"), postData);
router.put("/:id", verifyToken("admin"), updateData);
router.delete("/:id", verifyToken("admin"), deleteData);

module.exports = router;
