import { Express } from 'express';
import { insertNewUser, getUser, updateUserDetails, getUserDetails } from '../controllers/userAccountController';
import { UserDetailsInterface } from '../models/UserDetailsInterface';
// ? https://www.npmjs.com/package/multer
import multer from 'multer';

const DIR = './uploads/'; // contains images

/**
 * Adding code to set the file names for multer
 * ? See https://www.npmjs.com/package/multer#diskstorage
 */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, DIR)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpeg')
    }
})

//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
const uploadImg = multer({ storage: storage }).single('profilePic');

const userRoutes = (app: Express) => {

    app.route('/api/users')
        // to add a new user to the db
        .post((request, response) => {
            // get a user from the frontend
            const uid = request.body.uid;
            const userName = request.body.userName;
            const email = request.body.email;

            // insert the new user into the DB
            insertNewUser(response, uid, userName, email)
        })
        .get((request, response) => {
            getUser(response, request.query.uid)
        })

    app.route('/api/userdetails')
        .get((request, response) => {
            getUserDetails(response, request.query.uid)
        })
        .post((request, response) => {
            // photopath, displayName, postalcode, phonenumber, preferredmethodofcontact, email
            uploadImg(request, response, (err) => {
                if (err) {
                    // An error occurred when uploading
                    console.log(err);
                    return response.status(422).send({ error: err.message })
                  }

                const textFields = request.body;

                const userDetails: UserDetailsInterface = {
                    displayname: textFields.username,
                    phone: textFields.phonenumber,
                    email: textFields.email,
                    postalcode: textFields.postalcode,
                    city: textFields.city,
                    preferredContact: textFields.preferredmethodofcontact,
                    profilePic: request.file.filename
                }
                updateUserDetails(response, userDetails)
            })
        })
}

export default userRoutes
