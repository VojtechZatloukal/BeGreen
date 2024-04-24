const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/record/getAbl");
const ListByOrganizationAbl = require("../abl/record/listByOrganizationAbl");

const CreateAbl = require("../abl/record/createAbl");
const DeleteAbl = require("../abl/record/deleteAbl");

router.get("/get", GetAbl);
router.get("/listByOrganization", ListByOrganizationAbl);
router.post("/create", CreateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;
