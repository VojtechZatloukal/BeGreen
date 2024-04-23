const Ajv = require("ajv");
const ajv = new Ajv();

const recordDao = require("../../dao/record-dao.js")


const schema = {
  type: "object",
  properties: {
    Organization: { type: "string", minLength: 128, maxLength: 128 },
    CreatorGUID: { type: "string", minLength: 128, maxLength: 128 },
    Action: { type: "string", minLength:1 },
    Value: {type:"number"},
  },
  required: ["Organization", "CreatorGUID","Action", "Value"],
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

    // check if user exists
    const user = userDao.get(dtoIn.userId);
    if (!user) {
      res.status(404).json({
        code: "userNotFound",
        message: `User ${dtoIn.userId} not found`,
      });
      return;
    }

    // check if event exists
    const record = recordDao.get(dtoIn.eventId);
    if (!record) {
      res.status(404).json({
        code: "eventNotFound",
        message: `Event ${dtoIn.eventId} not found`,
      });
      return;
    }

    res.json(attendance);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
