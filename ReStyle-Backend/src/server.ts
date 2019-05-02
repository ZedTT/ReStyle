import express from 'express';
import fs from "fs";

const app = express();

app.get('/', function (req, res) {
    let doc = fs.readFileSync("../ReStyle-Frontend/src/app/app.component.html", "utf8");
    res.send(doc);
});

let port = 8000;
app.listen(port, function () {
    console.log("Application is listening on port" + port + "!");
});