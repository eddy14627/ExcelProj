const express = require("express");
const routes = express();
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const UserControllers = require("../Controllers/UserControllers");

routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(express.static(path.join(__dirname, "public")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/Uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

routes.post("/importUser", upload.single("file"), UserControllers.ImportUsers);

module.exports = routes;
