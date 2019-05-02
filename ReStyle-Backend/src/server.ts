import express from 'express';
import fs from "fs";

const app = express();

app.use('/', express.static('../ReStyle-Frontend/dist/ReStyle'));

app.get('/', function (req, res) {
    let doc = fs.readFileSync("../ReStyle-Frontend/dist/ReStyle/index.html", "utf8");
    res.send(doc);
});

let port = 8000;
app.listen(port, function () {
    console.log("Application is listening on port" + port + "!");
});
