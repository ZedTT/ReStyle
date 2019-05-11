"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var itemRoutes_1 = __importDefault(require("./routes/itemRoutes"));
var app = express_1.default();
// parse JSON from request
app.use(body_parser_1.default.json());
userRoutes_1.default(app);
itemRoutes_1.default(app);
/**
 * Fallback on routes other than '/' because otherwise we get "Cannot get /..." issues.
 * We need to let angular handle the routing
 * ? See https://stackoverflow.com/a/46565926 This has information on the problem that this fixes
 * ? See https://angular.io/guide/deployment#routed-apps-must-fallback-to-indexhtml
 * ? See https://asknodejs.blogspot.com/2017/06/express-fallback-route-also-used-for.html
 * ! This must be after every other more specific routing (get and post requests)
 * ! '*' refers to any url that was not already specified above.
 */
app.use('/', express_1.default.static('./ReStyle-Frontend/dist/ReStyle'));
app.use('*', express_1.default.static('./ReStyle-Frontend/dist/ReStyle')); // fallback
var port = process.env.PORT || 8000;
app.listen(port, function () {
    console.log("Application is listening on port " + port + "!");
    console.log("Click and check: http://localhost:8000/");
});
