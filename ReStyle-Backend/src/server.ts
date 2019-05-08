import express from 'express';
// local dbKey.ts file is required, not pushed to gitHub for security reasons
import { connectionString } from './dbKey';
const app = express();

import bodyParser from 'body-parser';

// -----TEST DATABASE CONNECTION-------------------------------------------------------------
// this is an example used to test connection between node.js server and PostgreSQL database
import { Client } from 'pg'
const insertUserQuery = 'INSERT INTO dev.restyle_user (userID, swapScore, userName, userPhotoPath)' +
    'VALUES ($1, $2, $3, $4) RETURNING *'

const client = new Client({
    connectionString: connectionString,
})
client.connect()

// --------------------------------------------------------------------------------------------

app.use('/', express.static('../ReStyle-Frontend/dist/ReStyle'));
app.use(bodyParser.json());

// this is an example used to test sending simple data to the front end
app.get('/ajax', function (req, res) {
    res.send({ 'text': 'hello angular' });
});

app.post('/api/users', (request, response) => {
    // get a user from the frontend
    console.log(request.body);
    const uid = request.body.uid;
    const userName = request.body.userName;
    const initialSwapScore = 5;

    // insert the new user into the DB
    client.query(insertUserQuery, [uid, initialSwapScore, userName, null], (err, res) => {
        if (err) {
            console.log("Error:", err)
        } else {
            console.log("Inside insert_user_with_return", res)
            if (res.rowCount === 1){
                console.log("New user added")
                response.send({'text': 'New user added'})
            }
        }
        client.end();
    })
})

let port = 8000;
app.listen(port, function () {
    console.log("Application is listening on port" + port + "!");
});


