const User = require("../model/user");
const Permission = require("../model/permission");
const { decrypt, encrypt } = require("../config/encriptionDecription");
const {
  defaultStockKeeperPermission,
  defaultsalePermission,
  DefaultAdminsystemAllowance,
} = require("../constant");



const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate("permissions")
      .populate("branches");
    const decryptedUsers = users.map((user) => {
      const decryptedPassword = decrypt(user.password);
      return { ...user._doc, password: decryptedPassword };
    });
    return res.status(200).json({ users: decryptedUsers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "server error while feching" });
  }
};

const editUser = async (req, res) => {
  console.log("user edit callded");
  console.log("userSocketMap", userSocketMap);
  const userId = req.params.id;

  const { user_info, permissions, allowed_branches } = req.body;
  const { role, password } = user_info;
  let system_permission = [];
  //  console.log(req.body)
  try {
    const existUser = await User.findById(userId);
    const oldPassword = existUser.password;
    const oldUserName = existUser.username;
    if (!existUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const roleExistUser = existUser.role;

    if (role === roleExistUser) {
      system_permission = permissions;
    } else {
      let defaultPermissions;
      switch (role) {
        case "admin":
          defaultPermissions = DefaultAdminsystemAllowance;
          break;
        case "sales":
          defaultPermissions = defaultsalePermission;
          break;
        case "stock_keeper":
          defaultPermissions = defaultStockKeeperPermission;
          break;
        default:
          return res.status(400).json({ message: "Invalid role specified" });
      }

      const permissions = await Permission.find({
        name: { $in: defaultPermissions },
      });
      system_permission = permissions.map((perm) => perm._id);
    }
    const hashedPassword = encrypt(password);
    user_info.password = hashedPassword;
    existUser.set({
      ...user_info,
      permissions: system_permission,
      branches: allowed_branches,
    });

    await existUser.save();

    const populatedUser = await existUser.populate("permissions branches");
    populatedUser.password = password;

    console.log("paswword of exist user", oldPassword);
    console.log("now password", hashedPassword);
    console.log("exist user name", oldUserName);
    console.log("now  user name", user_info.username);

    //

    if (oldUserName != user_info.username || oldPassword != hashedPassword) {
      // this means the admin doen't want the user to access the website so they have to force logout
      // first lets check if that user is
      if (userId in userSocketMap) {
        io.to(userSocketMap[userId]).emit("forceLogout");
        console.log("pasword is changed");
      } else {
        const message = new Message({
          user_id: userId,
          event: "forceLogout",
        });

        await message.save();
        // let me store the message after when he is connecting or let change the authentication
      }
    } else {
      if (userId in userSocketMap) {
        io.to(userSocketMap[userId]).emit("permissionsUpdated", {
          user: populatedUser,
        });
        console.log("permission is changed");
      } else {
        // what I am going to do

        const message = new Message({
          user_id: userId,
          event: "updatePermission",
        });

        await message.save();
      }
    }
    return res.status(200).json(populatedUser);
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
      console.log("deleted user contorller is now", userId)
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      console.log("user is not found")
      return res.status(404).json({ error: "User not found" });
    }

    // Delete the user
    await User.findByIdAndDelete(userId);
    console.log(userSocketMap)
    if (userId in userSocketMap) {
      io.to(userSocketMap[userId]).emit("forceLogout");
      console.log("pasword is changed");
    } else {
      const message = new Message({
        user_id: userId,
        event: "forceLogout",
      });
    console.log("message save")
      await message.save();
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("erro", error)
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
module.exports = {
  getAllUsers,
  editUser,
  deleteUser,
};
