import { query, connect } from '../db/dbInit'
import { insert_user_with_return, new_user_hide, get_user } from '../db/sql_library'
import { Response } from 'express';

// Initial swap score is hard coded to five
const initialSwapScore = 5;
const defaultProfilePhotoPath = 'defaultAvatar.png'

export function getUser(response: Response, uid: string) {
    query(get_user, [uid], (err, res) => {
        if (err) {
            console.log("Error inside get_user query: ", err)
            response.send({ error: err.message })
        } else {
            console.log(res)
            if (res.rows.length == 1) {
                const userRecord = res.rows[0];
                response.send({ swapScore: userRecord.swapScore, userName: userRecord.userName, userPhotoPath: userRecord.userPhotoPath })
            } else (
                response.send({ error: `User with uid: ${uid} not found` })
            )
        }
    })
}

// insert the new user into db
// ? Picture path is hardcoded to defaultProfilePhotoPath until user changes it in Edit Profile (to be implemented later)
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
