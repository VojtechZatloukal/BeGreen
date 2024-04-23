const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);


const userDao = require("../../dao/user-dao.js");
const roleDao = require("../../dao/role-dao.js");


const schema = {
  type: "object",
  properties: {
    Name: { type: "string"},
    Surname: { type: "string" },
    Email: { type: "string", format: "email" },
    isAdmin: { type: "boolean"},
    Password: { type: "string", minLength:3 },
    Organization:{type:"string", minLength:128,maxLength:128}
  },
  required: ["Name", "Surname","Email","isAdmin","Organization"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
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
    const userList = userDao.list();
    const emailExists = userList.some((u) => u.Email === user.Email);
    if (emailExists) {
      res.status(400).json({
        code: "emailAlreadyExists",
        message: `User with email ${user.email} already exists`,
      });
      return;
    }

    user.Role = roleDao.getId("OrganizationAdmin");
    if(!user.isAdmin){
      user.Password = "default";
      user.PasswordChanged = false;
      user.Role = roleDao.getId("OrganizationUser")
    }


    user = userDao.create(user);
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
