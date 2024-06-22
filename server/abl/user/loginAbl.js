const Ajv = require("ajv");
const ajv = new Ajv();

const userDao = require("../../dao/user-dao.js");

const schema = {
  type: "object",
  properties: {
    Email: { type: "string" },
    Password: {type:"string"}
  },
  required: ["Email","Password"],
  additionalProperties: false,
};

async function LoginAbl(req, res) {
  try {
    console.log("LoginAbl");
    const reqParams = req.query;
        // validate input
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not Valid",
        validationError: ajv.errors,
      });
      return;
    }

    // read user by given id
    const user = userDao.getByMail(reqParams.Email);
   
    if (!user) {
      res.status(404).json({
        code: "userNotFound",
        message: `User ${reqParams.GUID} not found`,
      });
      return;
    }
    if(reqParams.Password != user.Password){
        res.status(404).json({
            code: "wrongPassword",
            message: `You have put wrong password`,
          });
          return;
    }

    res.json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = LoginAbl;
