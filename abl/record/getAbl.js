const Ajv = require("ajv");
const ajv = new Ajv();

const recordDao = require("../../dao/record-dao.js");

const schema = {
  type: "object",
  properties: {
    GUID: { type: "string" },
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
    const record = recordDao.get(reqParams.GUID);
    if (!record) {
      res.status(404).json({
        code: "userNotFound",
        message: `User ${reqParams.id} not found`,
      });
      return;
    }

    res.json(record);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;
