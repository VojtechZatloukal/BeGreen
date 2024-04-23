const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/organization/getAbl");
const CreateAbl = require("../abl/organization/createAbl");
const DeleteAbl = require("../abl/organization/deleteAbl");

router.get("/get", GetAbl);
router.post("/create", CreateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;
