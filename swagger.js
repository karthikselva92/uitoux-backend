const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app/routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles).then(() => {
  require("./app/routes/index"); // Your project's root file
});
