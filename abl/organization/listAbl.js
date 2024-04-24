const Ajv = require("ajv");
const ajv = new Ajv();


const organizationDao = require("../../dao/organization-dao.js");



async function ListAbl(req, res) {
  try {
    const organizationList = organizationDao.list();
    res.json(organizationList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
