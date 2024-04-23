const Ajv = require("ajv");
const ajv = new Ajv();

const organizationDao = require("../../dao/organization-dao.js");

const schema = {
  type: "object",
  properties: {
    Name: { type: "string" },
    VATIN: { type: "string" },
    EmployeeCount:{type: "integer"},
    Admin: { type: "string" },
  },
  required: ["Name", "VATIN","EmployeeCount"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let organization = req.body;

    // validate input
    const valid = ajv.validate(schema, organization);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        note: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    organization = organizationDao.create(organization);
    res.json(note);
  } catch (e) {
    res.status(500).json({ note: e.note });
  }
}

module.exports = CreateAbl;
