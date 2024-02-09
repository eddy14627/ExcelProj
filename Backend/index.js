const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 3001;
const userRoute = require("./Routes/UserRoute");

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, Node.js!");
});

app.use("/", userRoute);

mongoose
  .connect(
    "mongodb+srv://adjee2020:Adarsh100@excelexportusingcsv.9w9yjic.mongodb.net/testDB"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  });
