import express from 'express';
import bodyParser from 'body-parser';
import { insertNewUser } from './controllers/userAccountController';

const app = express();
// parse JSON from request
app.use(bodyParser.json());

// this is an example used to test sending simple data to the front end
app.get('/ajax', function (req, res) {
    res.send({ 'text': 'hello angular' });
});

// to add a new user to the db
app.post('/api/users', (request, response) => {
    // get a user from the frontend
    const uid = request.body.uid;
    const userName = request.body.userName;

    // insert the new user into the DB
    insertNewUser(response, uid, userName)
})

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
});
