import { query } from '../db/dbInit'
import { insert_user_with_return }  from '../db/sql_library'
import { Response } from 'express';

// Initial swap score is hard coded to five
const initialSwapScore = 5;

// insert the new user into db
// ? Piture path is hardcoded to null for now
export function insertNewUser(response: Response, uid: string, userName: string){
    query(insert_user_with_return, [uid, initialSwapScore, userName, null], (error, result) => {
        if (error) {
            console.log("Error:", error)
        } else {
            console.log("Inside insert_user_with_return", result)
            if (result.rowCount === 1){
                console.log("New user added")
                response.send({'text': 'New user added'})
            }
        }
    })
}
