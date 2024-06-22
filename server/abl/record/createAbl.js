const Ajv = require("ajv");
const ajv = new Ajv();

const recordDao = require("../../dao/record-dao.js")
const organizationDao = require("../../dao/organization-dao.js");
const userDao = require("../../dao/user-dao.js");


const schema = {
  type: "object",
  properties: {
    OrganizationGUID: { type: "string"  },
    CreatorGUID: { type: "string" },
    Action: { type: "string" },
    Value: { type: "string" },
  },
  required: ["OrganizationGUID", "CreatorGUID", "Action", "Value"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let dtoIn = req.body;

    const valid = ajv.validate(schema, dtoIn);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }




    let organizationList = organizationDao.list();
    var organizationExists = false;
    for(var element in organizationList){
      if (element.GUID == dtoIn.GUID){
        organizationExists = true;
      }
    }

    if (!organizationExists) {
      res.status(400).json({
        code: "organizationDoesNotExists",
        message: `This organization does not exist`,
      });
      return;
    }

    const userList = userDao.list();
    const emailExists = userList.some((u) => u.GUID === dtoIn.CreatorGUID);
    if (!emailExists) {
      res.status(400).json({
        code: "userDoesNotExist",
        message: `This user does not exist`,
      });
      return;
    }
   

    if(dtoIn.Value < 0){
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "Value cannot be negative number",
        validationError: ajv.errors,
      });
      return;
    }


    dtoIn.Date = Date();
    let record = recordDao.create(dtoIn);


    res.json(record);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
