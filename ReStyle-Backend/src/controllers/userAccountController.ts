import { query, connect } from '../db/dbInit'
import { insert_user_with_return, new_user_hide, get_user } from '../db/sql_library'
import { Response } from 'express';

// Initial swap score is hard coded to five
const initialSwapScore = 5;

// insert the new user into db 
// ? Piture path is hardcoded to null for now
export function insertNewUser(response: Response, uid: string, userName: string) {

    connect((err, client, done) => {
        if (err) {
            console.log("Transaction connection error:", err)
            done()
            return
        }
        client.query(insert_user_with_return, [uid, initialSwapScore, userName, null], (error, result) => {
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
