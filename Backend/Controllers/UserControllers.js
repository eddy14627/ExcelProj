const User = require("../Models/Users");
const csv = require("csvtojson");

const ImportUsers = async (req, res) => {
  try {
    const userData = [];
    csv()
      .fromFile(req.file.path)
      .then(async (response) => {
        for (let i = 0; i < response.length; i++) {
          userData.push({
            id: response[i].id,
            name: response[i].name,
            nationality: response[i].nationality,
            city: response[i].city,
          });
        }
        await User.insertMany(userData);
      });
    return res.send({ status: 200, success: true, message: "CSV Imported" });
  } catch (error) {
    return res.send({ status: 400, success: false, message: error.message });
  }
};

module.exports = {
  ImportUsers,
};
