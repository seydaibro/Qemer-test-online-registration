const Permission = require("../model/permission");
const getAllPermisions = async (req, res) => {
  try {
    const permissions = await Permission.find()
    return res.status(200).json(permissions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({message:"server error while feching"})
  }
};
module.exports = {
  getAllPermisions
};