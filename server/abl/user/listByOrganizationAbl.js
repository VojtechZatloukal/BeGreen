const Ajv = require("ajv");
const ajv = new Ajv();


const userDao = require("../../dao/user-dao.js");


const schema = {
    type: "object",
    properties: {
      GUID: { type: "string" },
    },
    required: ["GUID"],
    additionalProperties: false,
  };

async function ListByOrganizationAbl(req, res) {
  try {
 // get request query or body
 const reqParams = req.query ;

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


 console.log(reqParams.GUID);
    const userList = userDao.listByOrganization(reqParams.GUID);
    console.log(userList);
    res.json(userList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListByOrganizationAbl;
