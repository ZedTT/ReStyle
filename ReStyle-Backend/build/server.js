"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.use('/', express_1.default.static('../ReStyle-Frontend/dist/ReStyle'));
app.get('/ajax', function (req, res) {
    res.send({ 'text': 'hello angular' });
});
var port = 8000;
app.listen(port, function () {
    console.log("Application is listening on port" + port + "!");
});
