/**
 * A module containing all the methods to handle the database queries that involve users.
 */

import { query, connect } from '../db/dbInit'
import { insert_user_with_return, new_user_hide, get_user } from '../db/sql_library'
import { Response } from 'express';

/**
 * Initial values for the new user.
 */
// Initial swap score.
const initialSwapScore = 5;
// Initial profile picture path.
const defaultProfilePhotoPath = 'defaultAvatar.png'

/**
 * Returns the data (swap score, user name, and user photo path) for a given user.
 * 
 * @param response an object to send a response back to frontend
 * @param uid an id of the user whose data is requested
 */
export function getUser(response: Response, uid: string) {
    query(get_user, [uid], (err, res) => {
        if (err) {
            console.log("Error inside get_user query: ", err)
            response.send({ error: err.message })
        } else {
            if (res.rows.length == 1) {
                const userRecord = res.rows[0];
                response.send({ swapScore: userRecord.swapscore, userName: userRecord.username, userPhotoPath: userRecord.userphotopath })
            } else (
                response.send({ error: `User with uid: ${uid} not found` })
            )
        }
    })
}

/**
 * Inserts the new user into the database.
 * Created records for the user with the specified id into the four tables:
 * restyle_user, hide, contact_details, address.
 * 
 * Is triggered every time there is a change in authentification state. If the user already exists in a database, 
 * an expected error is caught and no new entry is added.
 * 
 * ? Picture path is hardcoded to defaultProfilePhotoPath until user changes it in Edit Profile.
 * 
 * @param response an object to send a response back to frontend
 * @param uid the id of the user from the Firebase Authentification API
 * @param userName the displayed name of the user from the Firebase Authentification API
 * param email the email of the user from the Firebase Authentification API
 */
export function insertNewUser(response: Response, uid: string, userName: string) {

    connect((err, client, done) => {
        if (err) {
            console.log("Transaction connection error:", err)
            done()
            return
        }
        client.query(insert_user_with_return, [uid, initialSwapScore, userName, defaultProfilePhotoPath], (error, result) => {
            if (error) {
                response.send({ 'error': `User with id: ${uid} already exists.` })
                done()
            } else {
                if (result.rowCount === 1) {
                    client.query(new_user_hide, [uid], (error, result) => {
                        if (error) {
                            done()
                        } else {
                            response.send(
                                {
                                    'message':
                                        `New user with id: ${uid} and empty hide array for that user were added.`
                                })
                            done()
                        }
                    })
                } else {
                    done()
                }
            }
        })
    })
}
