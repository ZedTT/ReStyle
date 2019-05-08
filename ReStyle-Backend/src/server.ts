import express from 'express';
// local dbKey.ts file is required, not pushed to gitHub for security reasons
import { connectionString } from './dbKey';
const app = express();

// -----TEST DATABASE CONNECTION-------------------------------------------------------------
// this is an example used to test connection between node.js server and PostgreSQL database
import { Client } from 'pg'

const client = new Client({
    connectionString: connectionString,
})
client.connect()

client.query('SELECT t.* FROM dev.restyle_user t LIMIT 501', (err, res) => {
  console.log(res.rows)
  client.end()
})
// --------------------------------------------------------------------------------------------

// this is an example used to test sending simple data to the front end
app.get('/ajax', function (req, res) {
    res.send({ 'text': 'hello angular' });
});

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
