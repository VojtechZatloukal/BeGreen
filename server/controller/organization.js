const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/organization/getAbl");
const DeleteAbl = require("../abl/organization/deleteAbl");
const CreateWithAdminAbl = require("../abl/organization/createWithAdminAbl")

router.get("/get", GetAbl);
router.post("/createWithAdmin", CreateWithAdminAbl);
router.post("/delete", DeleteAbl);

module.exports = router;
