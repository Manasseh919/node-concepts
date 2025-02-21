//-> major releases -> API -> v1,v2

require("dotenv").config();
const { configureCors } = require("./config/corsConfig.js");

const express = require("express");
const cors = require("cors");
const {
  requestLogger,
  addTimeStamp,
} = require("./middleware/customMiddleware.js");
const { globalErrorHandler } = require("./middleware/errorHandler.js");
const { urlVersioning } = require("./middleware/apiVersioning.js");

const app = express();
const PORT = process.env.PORT || 3000;

//express json middleware
app.use(requestLogger);
app.use(addTimeStamp);

app.use(configureCors());
app.use(express.json());

app.use("/api/v1", urlVersioning("v1"));

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
