import { query, connect } from '../db/dbInit'
import { insert_user_with_return, new_user_hide } from '../db/sql_library'
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
                console.log("Query 'insert_user_with_return' error:", error)
                response.send({ 'error': `User with id: ${uid} already exists.` })
                done()
            } else {
                console.log("Inside insert_user_with_return", result)
                if (result.rowCount === 1) {
                    console.log("New user added")
                    client.query(new_user_hide, [uid, []], (error, result) => {
                        if (error) {
                            console.log("Query 'new_user_hide' error:", error)
                            done()
                        } else {
                            console.log("Inside new_user_hide", result)
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
