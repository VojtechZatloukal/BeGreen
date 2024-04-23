const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/record/getAbl");
const CreateAbl = require("../abl/record/createAbl");
const DeleteAbl = require("../abl/record/deleteAbl");

router.get("/get", GetAbl);
router.post("/create", CreateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;
