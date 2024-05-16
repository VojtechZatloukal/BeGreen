const Ajv = require("ajv");
const ajv = new Ajv();

const recordDao = require("../../dao/record-dao.js");
const organizationDao = require("../../dao/organization-dao.js");

const schema = {
  type: "object",
  properties: {
    GUID: { type: "string",minLength:36,maxLength:36  },
  },
  required: ["GUID"],
  additionalProperties: false,
};

async function ListByOrganizationAbl(req, res) {
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
    let organizationList = organizationDao.list();
    const organizationExists = organizationList.some((u) => u.GUID === reqParams.GUID);
    if (!organizationExists) {
      res.status(400).json({
        code: "organizationDoesNotExists",
        message: `This organization does not exist`,
      });
      userDao.remove(user);
      return;
    }

    // read user by given id
    const recordList = recordDao.listByOrganization(reqParams.GUID);
    

    res.json(recordList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListByOrganizationAbl;
