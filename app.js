const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

const organizationController = require("./controller/organization");
const userController = require("./controller/user");
const recordController = require("./controller/record");


app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/organization", organizationController);
app.use("/user", userController);
app.use("/record", recordController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
