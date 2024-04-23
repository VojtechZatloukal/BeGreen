const Ajv = require("ajv");
const ajv = new Ajv();
const addFormats = require("ajv-formats").default;
addFormats(ajv);

const organizationDao = require("../../dao/organization-dao.js");
const userDao = require("../../dao/user-dao.js");

const schema = {
  type: "object",
  properties: {
    Name: { type: "string" },
    VATIN: { type: "string" },
    EmployeeCount:{type: "integer"},
    AdminEmail: { type: "string",format: "email" },
    AdminName: { type: "string" },
    AdminSurname: { type: "string" },
    AdminPassword: { type: "string" },

  },
  required: ["Name", "VATIN","EmployeeCount","AdminEmail", "AdminName","AdminSurname","AdminPassword",],
  additionalProperties: false,
};

async function CreateWithAdminAbl(req, res) {
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

module.exports = CreateWithAdminAbl;
