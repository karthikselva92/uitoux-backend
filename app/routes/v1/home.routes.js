const app = require("express").Router();
const {
    HomeDetails,
    ProductDetails,
    CategoryDetails,
    CardDetails
} = require("../../controllers/home.controller");

app.get("/", HomeDetails);
app.get("/products", ProductDetails);
app.get("/category", CategoryDetails);
app.get("/cards", CardDetails);

module.exports = app;
