const getKeyByValue = require("../helpers/getKeyByValue");


function getName(id) {
   try{
    return Roles[id];

}catch{
    throw new Error("Role with such ID does not exist")
}
}
function getId(name){
    try{
        return getKeyByValue(Roles, name);

    }catch{
        throw new Error("Role with such name does not exist")
    }
}

const Roles = {
    0: "None",
    1: "Admin",
    2: "OrganizationAdmin",
    3: "OrganizationUser"
}

module.exports = {
   getName,
   getId
  };
  