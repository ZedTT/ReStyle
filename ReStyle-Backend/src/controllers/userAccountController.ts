/**
 * A module containing all the methods to handle the database queries that involve users.
 */

import { query, connect } from '../db/dbInit'
import {
    insert_user_with_return, new_user_hide, get_user, insert_email_contact_details,
    user_details, update_contact_details_with_return, update_address_details_with_return,
    update_user_name_and_user_profile_pic,
    new_address_details
} from '../db/sql_library'
import { Response } from 'express';
import { UserDetailsInterface } from '../models/UserDetailsInterface';

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
 * @param email the email of the user from the Firebase Authentification API
 */
// ? Picture path is hardcoded to defaultProfilePhotoPath until user changes it in Edit Profile (to be implemented later)
export function insertNewUser(response: Response, uid: string, userName: string, email: string) {

    connect((err, client, done) => {
        if (err) {
            console.log("Transaction connection error:", err)
            done()
            return
        }
        client.query(insert_user_with_return, [uid, initialSwapScore, userName, defaultProfilePhotoPath], (error, result) => {
            if (error) {
                response.send({ 'error': `User with id: ${uid} already exists.` })
                // console.log("Error inside insert_user_with_return query: ", error.message);
                done()
            } else {
                if (result.rowCount === 1) {
                    client.query(new_user_hide, [uid], (error, result) => {
                        if (error) {
                            console.log("Error inside new_user_hide query: ", error.message);
                            done()
                        } else {
                            client.query(insert_email_contact_details, [uid, email], (error, result) => { // add user email
                                if (error) {
                                    console.log("Error inside insert_email_contact_details query: ", error.message);
                                    done();
                                } else {
                                    client.query(new_address_details, [uid, null, null], (error, result) => {
                                        if (error) {
                                            console.log("Error inside new_address_details query: ", error.message);
                                            done();
                                        } else {
                                            response.send(
                                                {
                                                    'message':
                                                        `New user with id: ${uid} and empty hide array for that user were added.`
                                                })
                                            done()
                                        }
                                    })
                                }
                            })
                        }
                    })
                } else {
                    done()
                }
            }
        })
    })
}

/**
 * Sets new user details values. Is used on Edit User Profile Page.
 * Involves updating three tables in the database, this is why the transaction is used.
 * 
 * @param response an object to send a response back to frontend
 * @param userDetails an instance of UserDetailsInterface that contains all the needed fields:
 * id of the user whose details are going to be changed, 
 * display name, 
 * phone number, 
 * email address, 
 * postalcode, 
 * city, 
 * preferred method of contact, 
 * path to the profile photo
 */
export function updateUserDetails(response: Response, userDetails: UserDetailsInterface) {

    connect((err, client, done) => {
        if (err) {
            console.log("Transaction connection error:", err)
            response.send({ 'error': err.message })
            done()
            return
        }
        client.query(update_contact_details_with_return,
            [userDetails.email, userDetails.phone, userDetails.preferredContact, userDetails.userId],
            (err, res) => {
                if (err) {
                    response.send({ 'error': err.message })
                    done()
                }
                else {
                    client.query(update_user_name_and_user_profile_pic,
                        [userDetails.displayname, userDetails.profilePic, userDetails.userId],
                        (err, res) => {
                            if (err) {
                                response.send({ 'error': err.message })
                                done()
                            } else {
                                query(update_address_details_with_return,
                                    [userDetails.city, userDetails.postalcode, userDetails.userId],
                                    (err, res) => {
                                        if (err) {
                                            response.send({ 'error': err.message })
                                            done()
                                        } else {
                                            if (res.rows.length === 1) {
                                                response.send({ 'message': "User details were updated successfully." })
                                            } else {
                                                response.send({ 'error': `Something went wrong. UID: ${userDetails.userId}` })
                                            }
                                            done()
                                        }
                                    })
                            }
                        })
                }
            })
    })
}

/**
 * Returns the details of the user with the given id.
 * Is used on Edit Profile Page to populate the fields 
 * and on Inventory page to display user account information.
 * 
 * The data is returned in the format of UserDetailsInterface,
 * which consists of:
 *  
 * id of the user whose details are going to be changed, 
 * display name, 
 * phone number, 
 * email address, 
 * postalcode, 
 * city, 
 * preferred method of contact, 
 * path to the profile photo
 * 
 * @param response an object to send a response back to frontend
 * @param uid an id of the user whose details are requested
 */
export function getUserDetails(response: Response, uid: string) {
    query(user_details, [uid], (error, result) => {
        if (error) {
            console.log("Error inside getUserDetails query: ", error)
            response.send({ error: error.message })
        } else {
            if (result.rows.length == 1) {
                const userRecord = result.rows[0];
                const userDetailsToSend: UserDetailsInterface = {
                    userId: uid,
                    displayname: userRecord.username,
                    phone: userRecord.phonenumber,
                    email: userRecord.email,
                    postalcode: userRecord.postalcode,
                    city: userRecord.city,
                    preferredContact: userRecord.preferredmethodofcontact,
                    profilePic: userRecord.userphotopath
                }
                response.send(userDetailsToSend)
            } else (
                response.send({ error: `User with uid: ${uid} not found` })
            )
        }
    })
}
