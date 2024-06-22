const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/user/getAbl");
const ListAbl = require("../abl/user/listByOrganizationAbl");
const CreateAbl = require("../abl/user/createAbl");
const UpdateAbl = require("../abl/user/updateAbl");
const DeleteAbl = require("../abl/user/deleteAbl");
const LoginAbl =  require("../abl/user/loginAbl");

router.get("/get", GetAbl);
router.get("/login",LoginAbl)
router.get("/list", ListAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.delete("/delete", DeleteAbl);

module.exports = router;
