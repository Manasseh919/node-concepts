require("dotenv").config();
const { configureCors } = require("./config/corsConfig.js");

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

//express json middleware
app.use(configureCors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
