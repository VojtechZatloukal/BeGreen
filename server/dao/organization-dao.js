const fs = require("fs");
const path = require("path");
const crypto = require("crypto");


const organizationFolderPath = path.join(__dirname, "storage", "organizationList");
const userFolderPath = path.join(__dirname, "storage", "userList");
const recordFolderPath = path.join(__dirname, "storage", "recordList");

// Method to read an user from a file
function get(organizationGUID) {
  try {
    const filePath = path.join(organizationFolderPath, `${organizationGUID}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadOrganization", message: error.message };
  }
}

function lastActivity(){
  try {
    const files = fs.readdirSync(recordFolderPath);
    const activityList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(recordFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    var newestActivity = null;
    for (var element of activityList) {
    if(newestActivity == null){
      newestActivity = element
    }
    else{
      if(newestActivity.Date.getTime() >= element.Date.getTime()){
        newestActivity = element;
      }
    }

  }
    return newestActivity;
  } catch (error) {
    throw { code: "failedToListUsers", message: error.message };
  }
}

function create(organization) {
  try {
    organization.GUID = crypto.randomUUID().toString();
    const filePath = path.join(organizationFolderPath, `${organization.GUID}.json`);
    const fileData = JSON.stringify(organization);
    fs.writeFileSync(filePath, fileData, "utf8");
    return organization;
  } catch (error) {
    throw { code: "failedToCreateOrganization", message: error.message };
  }
}

function update(organization) {
  try {
    const currentOrganization = get(organization.GUID);
    if (!currentOrganization) return null;

    const newOrganization = { ...currentOrganization, ...organization };

    const filePath = path.join(organizationFolderPath, `${organization.GUID}.json`);
    const fileData = JSON.stringify(newOrganization);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newOrganization;
  } catch (error) {
    throw { code: "failedToUpdateOrganization", message: error.message };
  }
}

// Method to remove an user from a file
function remove(organizationGUID) {
  try {
   
      const filePath = path.join(organizationFolderPath, `${organizationGUID}.json`);
      fs.unlinkSync(filePath);
      return {};
   
    
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveUser", message: error.message };
  }
}

// Method to list users in a folder
function list() {
  try {
    const files = fs.readdirSync(organizationFolderPath);
    const userList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(organizationFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    return userList;
  } catch (error) {
    throw { code: "failedToListUsers", message: error.message };
  }
}



module.exports = {
  get,
  create,
  update,
  remove,
  list,
};
