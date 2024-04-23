const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const recordFolderPath = path.join(__dirname, "storage", "recordList");


function get(recordGUID) {
  try {
    const filePath = path.join(recordFolderPath, `${recordGUID}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    throw { code: "failedToReadRecord", message: error.message };
  }
}

function create(record) {
  try {
    record.GUID = crypto.randomUUID().toString();
    const filePath = path.join(recordFolderPath, `${record.GUID}.json`);
    const fileData = JSON.stringify(record);
    fs.writeFileSync(filePath, fileData, "utf8");
    return record;
  } catch (error) {
    throw { code: "failedToCreateRecord", message: error.message };
  }
}


function update(record) {
  try {
    const currentEvent = get(record.GUID);
    if (!currentEvent) return null;
    const newRecord = { ...currentEvent, ...record };
    const filePath = path.join(recordFolderPath, `${record.GUID}.json`);
    const fileData = JSON.stringify(newRecord);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newRecord;
  } catch (error) {
    throw { code: "failedToUpdateRecord", message: error.message };
  }
}


function remove(eventGUID) {
  try {
    const filePath = path.join(eventFolderPath, `${eventGUID}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw { code: "failedToRemoveRecord", message: error.message };
  }
}


function list() {
  try {
    const files = fs.readdirSync(recordFolderPath);
    const recordList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(recordFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
    recordList.sort((a, b) => new Date(a.date) - new Date(b.date));
    return recordList;
  } catch (error) {
    throw { code: "failedToListRecords", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};
