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
  console.log("Creating a User");
  console.log(req.body);

  try {
    // Extracting fields from the request body
    const { firstName, surname, email, password, age, course } = req.body;

    // Check if the user already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({ message: "User already registered" });
    }

    // Encrypt the password using bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance with the hashed password and other data
    const newUser = new User({
      firstName,
      surname,
      email,
      password: hashedPassword,
      age,
      course,
    });

    // Save the new user to the database
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send success response with user details and token
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        surname: newUser.surname,
        email: newUser.email,
        age: newUser.age,
        course: newUser.courses,
      },
      token,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "An error occurred during registration" });
  }
};

const login = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }
    const foundUser = await User.findOne({ username: username }).exec();
    if (!foundUser) {
      console.log("user doen't found");
      return res.status(401).json({ message: "User doesn't exist" }); // Unauthorized
    }

    const decryptedPassword = decrypt(foundUser.password);
    if (password === decryptedPassword) {
      const token = jwt.sign(
        {
          username: foundUser.username,
          user_id: foundUser._id,
          role: foundUser.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "24h" }
      );

      const popUser = await User.findById(foundUser._doc._id)
       
      const { password: userPassword, ...others } = popUser._doc;
      console.log("others", others);
      return res.json({ token, user: others });
    } else {
      return res.status(401).json({ message: "Wrong password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const checkForceLogout = async (req, res) => {
  const user_id = req.params.id;
  let isUserForceLogout = false;

  try {
    const userMessages = await Message.find({
      user_id: user_id,
      event: "forceLogout",
    });

    if (userMessages.length > 0) {
      isUserForceLogout = true;
    }

    return res.json({ forced: isUserForceLogout });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
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
  checkForceLogout,
  checkUpdatePermission,
};
