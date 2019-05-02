"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var app = express_1.default();
app.get('/', function (req, res) {
    var doc = fs_1.default.readFileSync("../ReStyle-Frontend/src/app/app.component.html", "utf8");
    res.send(doc);
});
var port = 8000;
app.listen(port, function () {
    console.log("Application is listening on port" + port + "!");
});
