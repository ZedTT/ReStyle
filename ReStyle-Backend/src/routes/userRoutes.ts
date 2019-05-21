/**
 * A module that contains all the routes that are related to the users.
 */
import { Express } from 'express';
import { insertNewUser, getUser } from '../controllers/userAccountController';

/**
 * All the user routes to export.
 * 
 * @param app an instance of express module initialized in server.ts file.
 */
const userRoutes = (app: Express) => {

    app.route('/api/users')
        /**
         * A get request to get the data for a specific user.
         */
        .get((request, response) => {
            getUser(response, request.query.uid)
        })
        /**
         * A post request to add a new user to the database.
         */
        .post((request, response) => {
            // get a user from the frontend
            const uid = request.body.uid;
            const userName = request.body.userName;

            // insert the new user into the DB
            insertNewUser(response, uid, userName)
        });
}

export default userRoutes
