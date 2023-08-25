const swaggerUi = require("swagger-ui-express");
const swaggerUiDoc = swaggerUi.setup(require("../../swagger-output.json"), {});
const swaggerUiServe = swaggerUi.serve;

module.exports = {
  swaggerUiServe,
  swaggerUiDoc,
};
