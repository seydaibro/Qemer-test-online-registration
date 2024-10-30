const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectMongo = require("./config/connectMongo"); // Import the connection function
const multer = require("multer");
const path = require('path');

dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectMongo(); // No need to assign it to a variable here


app.use(cors({ origin: 'http://localhost:4000', credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
// Configure multer storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Define the upload route
// Define the upload route after CORS setup
app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  console.log("upload", file);
  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.status(200).json({ filename: file.filename }); // Send the filename as a response
});




// Import routes
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const permissionRoute = require("./routes/permissionsRoute");
const courseRoute = require("./routes/courseRoute")

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/permission", permissionRoute);
app.use("/api/course", courseRoute)

// Start server
const PORT = process.env.PORT || 4100;
app.listen(PORT, () => {
  console.log("App is running on port", PORT);
});
