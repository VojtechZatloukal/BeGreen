const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const roleDao = require("./role-dao");

const userFolderPath = path.join(__dirname, "storage", "userList");

// Method to read an user from a file
function get(userGUID) {
  try {
    console.log(userGUID);
    const filePath = path.join(userFolderPath, `${userGUID}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadUser", message: error.message };
  }
}

// Method to write an user to a file
function create(user) {
  try {
    user.GUID = crypto.randomUUID().toString();
    const filePath = path.join(userFolderPath, `${user.GUID}.json`);
    const fileData = JSON.stringify(user);
    fs.writeFileSync(filePath, fileData, "utf8");
    return user;
  } catch (error) {
    throw { code: "failedToCreateUser", message: error.message };
  }
}


// Method to update user in a file
function update(user) {
  try {
    const currentUser = get(user.GUID);
    if (!currentUser) return null;

    const newUser = { ...currentUser, ...user };
if(newUser.Password != "default" && newUser.Password != currentUser){
    newUser.PasswordChanged = true;
}
    const filePath = path.join(userFolderPath, `${user.GUID}.json`);
    const fileData = JSON.stringify(newUser);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newUser;
  } catch (error) {
    throw { code: "failedToUpdateUser", message: error.message };
  }
}

// Method to remove an user from a file
function remove(userGUID) {
  try {
   
      const filePath = path.join(userFolderPath, `${userGUID}.json`);
      fs.unlinkSync(filePath);
    
    
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
    const files = fs.readdirSync(userFolderPath);
    const userList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(userFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    return userList;
  } catch (error) {
    throw { code: "failedToListUsers", message: error.message };
  }
}

function listByOrganization(organizationGUID){
    try {
        const files = fs.readdirSync(userFolderPath);
        const userList = files.map((file) => {
          const fileData = fs.readFileSync(path.join(userFolderPath, file), "utf8");
          jsonData = JSON.parse(fileData);
          if(jsonData.Organizace == organizationGUID){
            return jsonData;
          }
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
  listByOrganization
};
