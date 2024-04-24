const Ajv = require("ajv");
const ajv = new Ajv();

const userDao = require("../../dao/user-dao.js");
const roleDao = require("../../dao/role-dao.js");

const schema = {
  type: "object",
  properties: {
    GUID: { type: "string",minLength:36,maxLength:36 },
  },
  required: ["GUID"],
  additionalProperties: false,
};

async function DeleteAbl(req, res) {
  try {
    const reqParams = req.body;
    // validate input
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }
    const currentUser = userDao.get(reqParams.GUID);

    if(currentUser == null){
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "User does not exist",
      });
      return;
    }
    if(currentUser.Role === roleDao.getId("OrganizationAdmin")){
      res.status(403).json({
        code: "dtoInIsNotValid",
        message: "You cannot delete admin of organization",
      });
      return;
    }
    
    userDao.remove(reqParams.GUID);

    res.json({});
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = DeleteAbl;
