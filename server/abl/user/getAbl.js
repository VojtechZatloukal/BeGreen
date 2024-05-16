const Ajv = require("ajv");
const ajv = new Ajv();

const userDao = require("../../dao/user-dao.js");

const schema = {
  type: "object",
  properties: {
    GUID: { type: "string",minLength:36,maxLength:36  },
  },
  required: ["GUID"],
  additionalProperties: false,
};

async function GetAbl(req, res) {
  try {
    // get request query or body
    const reqParams = req.query?.GUID ? req.query : req.body;
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

    // read user by given id
    const user = userDao.get(reqParams.GUID);
    if (!user) {
      res.status(404).json({
        code: "userNotFound",
        message: `User ${reqParams.GUID} not found`,
      });
      return;
    }

    res.json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;
