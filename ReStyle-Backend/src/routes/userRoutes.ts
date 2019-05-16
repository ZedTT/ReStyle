import { Express } from 'express';
import { insertNewUser } from '../controllers/userAccountController';

const userRoutes = (app: Express) => {
    
    app.route('/api/users')
        // to add a new user to the db
        .post((request, response) => {
            // get a user from the frontend
            const uid = request.body.uid;
            const userName = request.body.userName;

            // insert the new user into the DB
            insertNewUser(response, uid, userName)
        })
        .get((request, response) => {
            request.query.uid
        })
}

export default userRoutes
