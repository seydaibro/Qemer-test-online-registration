const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Permission = require("../model/permission");
const {
  defaultStudentPermission,
  defaultTeacherPermission,
  DefaultAdminsystemAllowance,
} = require("../constant");


const register = async (req, res) => {
  console.log("Creating a User", req.body);
  try {
    const { firstName, surname, age, courses, email, password, role, phone_number } = req.body;
    const existingUser = await User.findOne({ email, phone_number });

    if (existingUser) {
      console.log("User found");
      return res.status(400).json({ message: "User already registered" });
    }

    // Use bcrypt to hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName, 
      surname,
      age,
      courses,
      email,
      role,
      phone_number,
      password: hashedPassword,
    });

    let defaultPermissions;
    switch (role) {
      case "admin":
        defaultPermissions = DefaultAdminsystemAllowance;
        break;
      case "teacher":
        defaultPermissions = defaultTeacherPermission;
        break;
      case "student":
        defaultPermissions = defaultStudentPermission;
        break;
      default:
        return res.status(400).json({ message: "Invalid user role" });
    }

    const permissions = [];
    for (const permissionName of defaultPermissions) {
      let permission = await Permission.findOne({ name: permissionName });
      if (!permission) {
        permission = new Permission({ name: permissionName });
        await permission.save();
      }
      permissions.push(permission._id);
    }
    newUser.permissions = permissions;

    await newUser.save();
    console.log(newUser);
    newUser.password = undefined; // Do not return the password
    const sendedUser = await newUser.populate("permissions courses");
    return res.status(201).json({ message: "User created successfully", user: sendedUser });
  } catch (error) {
    console.error("Error during user registration:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const login = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) {
      console.log("User doesn't exist");
      return res.status(401).json({ message: "User doesn't exist" });
    }

    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (passwordMatch) {
      const token = jwt.sign(
        {
          email: foundUser.email,
          user_id: foundUser._id,
          role: foundUser.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "24h" }
      );

      const popUser = await User.findById(foundUser._id).populate("courses")
      .populate("permissions").exec();
      const { password: userPassword, ...others } = popUser._doc;

      console.log("Authenticated user:", others);
      return res.json({ token, user: others });
    } else {
      return res.status(401).json({ message: "Incorrect password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};




const checkUpdatePermission = async (req, res) => {
  const user_id = req.params.id;
  let isUpdatePermission = false;
  try {
    const userMessages = await Message.find({
      user_id: user_id,
      event: "updatePermission",
    });

    if (userMessages.length > 0) {
      isUpdatePermission = true;
    }

    return res.json({ isUpdatePermission: isUpdatePermission });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  login,
  register,
  checkUpdatePermission,
};
