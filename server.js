const express = require("express");
var helmet = require("helmet");
const cors = require("cors");
const uuid = require("uuid");
const path = require("path");
const userAuthorization = require("./app/middlewares/user-authorization.middleware");
const requestLogger = require("./app/middlewares/request-logger.middleware");
const bodyParser = require("body-parser");
require('dotenv').config();
logger = require("./app/config/log.config.js").getLogger("server");

global.logContext = {};
global.__basedir = __dirname;

const app = express();
//TODO: enable secure cookie, ratelimit,
const _pathname = path.resolve();
// parse requests of content-type - application/json
//app.use(express.json());
app.use(bodyParser.json({ limit: "500mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.disable("x-powered-by");

app.options("*", cors());

//CORS Middleware
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization, x-access-token,"
  );
  next();
});

//Swagger-UI
logger.info("Environment :" + process.env.NODE_ENV || "");
if ((process.env.NODE_ENV || "").trim() === "dev") {
  logger.info("****** API docs swagger-ui is enabled ******");
}
const {
  swaggerUiServe,
  swaggerUiDoc,
} = require("./app/middlewares/swagger-ui.middleware");
app.use("/api-docs", swaggerUiServe, swaggerUiDoc);
app.use(requestLogger);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to api.",
    buildTag: "BUILD_TAG",
  });
});

//requestId
app.use((req, res, next) => {
  if (!req.headers["requestId"]) {
    req.headers["requestId"] = uuid.v4();
  }
  logContext["rid"] = req.headers["requestId"];
  logContext["uid"] = req.currentUser && req.currentUser.id;

  next();
});

app.use(userAuthorization);

// routes
app.use("/api", require("./app/routes"));
app.use("/category_image", express.static(_pathname + '/public/category_image'));
app.use("/product_image", express.static(_pathname + '/public/product_image'));
app.use("/banner_image", express.static(_pathname + '/public/banner_image'));
console.log(_pathname)
// set port, listen for requests 
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//unhandled system error
// please do not move the filter order
app.use((err, req, res, next) => {
  logger.error("Unhandled error caught at filter", err.stack);
  res.status(500).send({
    message: err.message || "Server Error",
  });
});