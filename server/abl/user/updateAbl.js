const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const userDao = require("../../dao/user-dao.js");

const schema = {
  type: "object",
  properties: {
    GUID: { type: "string"},
    Name: { type: "string"},
    Surname: {type: "string"},
    Organization: {type:"string"},
    Password:{type:"string",minLength:3}
  },
  required: ["GUID"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let user = req.body;

    // validate input
    const valid = ajv.validate(schema, user);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }
    const updatedUser = userDao.update(user);
    if (!updatedUser) {
      res.status(404).json({
        code: "userNotFound",
        message: `User ${user.GUID} not found`,
      });
      return;
    }

    res.json(updatedUser);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
