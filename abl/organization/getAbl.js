const Ajv = require("ajv");
const ajv = new Ajv();
const organizationDao = require("../../dao/organization-dao.js");

const schema = {
  type: "object",
  properties: {
    GUID: { type: "string",minLength:36,maxLength:36 },
  },
  required: ["GUID"],
  additionalProperties: false,
};


async function GetAbl(req, res) {
  try {
    // get request query or body
    const reqParams = req.body;

    // validate input
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        note: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    let organization = organizationDao.get(reqParams.GUID);
    res.json(organization);
  } catch (e) {
    res.status(500).json({ note: e.note });
  }
}

module.exports = GetAbl;
