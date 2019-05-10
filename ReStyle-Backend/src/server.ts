import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import itemRoutes from './routes/itemRoutes';

const app = express();
// parse JSON from request
app.use(bodyParser.json());


userRoutes(app)
itemRoutes(app)

/** 
 * Fallback on routes other than '/' because otherwise we get "Cannot get /..." issues.
 * We need to let angular handle the routing
 * ? See https://stackoverflow.com/a/46565926 This has information on the problem that this fixes
 * ? See https://angular.io/guide/deployment#routed-apps-must-fallback-to-indexhtml
 * ? See https://asknodejs.blogspot.com/2017/06/express-fallback-route-also-used-for.html
 * ! This must be after every other more specific routing (get and post requests)
 * ! '*' refers to any url that was not already specified above.
 */
app.use('/', express.static('../ReStyle-Frontend/dist/ReStyle'));
app.use('*', express.static('../ReStyle-Frontend/dist/ReStyle')); // fallback

let port = 8000;
app.listen(port, function () {
    console.log("Application is listening on port " + port + "!");
    console.log("Click and check: http://localhost:8000/");
});
