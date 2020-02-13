const express = require("express");
const path = require("path");

const app = express();

app.use("/public", express.static(__dirname + "/public"));

app.get('/', function (request, response) {
    response.sendFile(path.resolve("public/html/home.html"));
});

app.use("*", (request, response) => {
    response.status(404).json({error: "Route not found"});
});

const port = 3000;

app.listen(port, () => {
    console.log("The server is up and running !!!");
    console.log(`The routes are running on http://localhost:${port}`);
});