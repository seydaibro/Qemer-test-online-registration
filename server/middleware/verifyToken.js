const jwt = require("jsonwebtoken");
const User = require("../model/user");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader) {
    console.log("Authentication token missing");
    return res.status(401).json({ message: "Authentication token missing!" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log("Token verification failed:", err);
      return res.status(403).json({ message: "Token is not valid!" });
    }

    req.decoded = decoded;
    console.log("Token verified:", decoded);
    next();
  });
};

const checkPermission = (permissionName) => async (req, res, next) => {
  const decoded = req.decoded;
  if (!decoded || !decoded.user_id) {
    console.log("Decoded token missing or invalid");
    return res
      .status(401)
      .json({ message: "Authentication token missing or invalid!" });
  }

  try {
    const user = await User.findById(decoded.user_id).populate("permissions");
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found!" });
    }

    const hasPermission = user.permissions.some(
      (permission) => permission.name === permissionName
    );
    if (!hasPermission) {
      console.log("User lacks required permission:", permissionName);
      return res.status(401).json({ error: "Not Authorized" });
    }

    console.log("Permission check passed:", permissionName);
    next();
  } catch (error) {
    console.error("Error checking permissions:", error);
    res.status(500).json({ error: "Server error while checking permissions" });
  }
};


const isUserAllocatedInTheBranch = async (user_id, branch_id) => {
  try {
    const userNow = await User.findById(user_id);
    if (!userNow) {
      return false;
    } else {
      if (userNow.branches.some((branch) => branch == branch_id)) {
        return true;
      } else {
        return false;
      }
    }
  } catch (err) {
    return false;
  }
};
module.exports = {
  checkPermission,
  verifyToken,
  isUserAllocatedInTheBranch,
};
