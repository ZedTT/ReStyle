import express from 'express'; 
// local dbKey.ts file is required, not pushed to gitHub for security reasons
import { connectionString } from './dbKey';
const app = express();

// -----TEST DATABASE CONNECTION-------------------------------------------------------------
// this is an example used to test connection between node.js server and PostgreSQL database
const { Pool, Client } = require('pg')

const pool = new Pool({
  connectionString: connectionString,
})

const client = new Client({
  connectionString: connectionString,
})
client.connect()

client.query('SELECT t.* FROM dev.restyle_user t LIMIT 501', (err: any, res: any) => {
  console.log(res.rows)
  client.end()
})
// --------------------------------------------------------------------------------------------

app.use('/', express.static('../ReStyle-Frontend/dist/ReStyle'));

// this is an example used to test sending simple data to the front end
app.get('/ajax', function (req, res) {
    res.send({'text': 'hello angular'});
});

let port = 8000;
app.listen(port, function () {
    console.log("Application is listening on port" + port + "!");
});
