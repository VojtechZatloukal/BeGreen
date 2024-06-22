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
    EmployeeCount: { type: "string" },
    AdminEmail: { type: "string", format: "email" },
    AdminName: { type: "string" },
    AdminSurname: { type: "string" },
    AdminPassword: { type: "string" },

  },
  required: ["Name", "VATIN", "EmployeeCount", "AdminEmail", "AdminName", "AdminSurname", "AdminPassword"],
  additionalProperties: false,
};

async function CreateWithAdminAbl(req, res) {
  try {
  
    let dtoIn = req.body;

    // validate input
    const valid = ajv.validate(schema, dtoIn);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        note: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }
    let organizationList = organizationDao.list();
    const organizationExists = organizationList.some((u) => u.VATIN === dtoIn.VATIN);
    if (organizationExists) {
      res.status(400).json({
        code: "organizationAlreadyExists",
        message: `Organization with VATIN ${dtoIn.VATIN} already exists`,
      });
      
      return;
    }

    const userList = userDao.list();
    const emailExists = userList.some((u) => u.Email === dtoIn.AdminEmail);
    if (emailExists) {
      res.status(400).json({
        code: "emailAlreadyExists",
        message: `User with email ${dtoIn.AdminEmail} already exists`,
      });
      return;
    }

    let user = userDao.create({ Name: dtoIn.AdminName, Surname: dtoIn.AdminSurname, Password: dtoIn.AdminPassword, Email: dtoIn.AdminEmail, PasswordChanged: true, Role: 2 })
  
    let organization = organizationDao.create({Name:dtoIn.Name,VATIN:dtoIn.VATIN,EmployeeCount:dtoIn.EmployeeCount, Admin:user.GUID})
    user.Organization = organization.GUID;
    userDao.update(user);
    res.json(organization);
  } catch (e) {
    res.status(500).json({ note: e.note });
  }
}

module.exports = CreateWithAdminAbl;
