import { Express } from 'express';
import { insertNewUser } from '../controllers/userAccountController';

const userRoutes = (app: Express) => {

    // this is an example used to test sending simple data to the front end
    app.route("/ajax")
        .get((req, res) => {
            res.send({ 'text': 'hello angular' });
        })

    app.route('/api/users')
        // to add a new user to the db
        .post((request, response) => {
            // get a user from the frontend
            const uid = request.body.uid;
            const userName = request.body.userName;

            // insert the new user into the DB
            insertNewUser(response, uid, userName)
        })
}

export default userRoutes
