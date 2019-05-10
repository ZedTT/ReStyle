import { query } from "../db/dbInit";
import { insert_item_with_return, get_user_item } from "../db/sql_library";
import { Response } from 'express';
import { TradeItemModel } from '../models/tradeItemModel';

// insert dummy item to the db
export function dummy_insertItemForUserWithId() {
    query(insert_item_with_return, ['l15CGtMJ5bSnEkRPpYEgyvVWeLt2', 'description', 'Female', 1, 'title', 'category', ['path1', 'path2', 'path3']], (err, res) => {
        if (err) {
            console.log("Error:", err)
        } else {
            console.log("Inside insert_item_with_return", res)
        }
    })
}

// insert an item to the db using the user uid
export function insertItemForUserWithId(response: Response, item: TradeItemModel) {
    if (item.getSize() < 0 || item.getSize() > 4) {
        response.send({ 'error': 'Invalid size. Expected from 0 to 4 included. Actual: ' + item.getSize() })
    } else {
        query(insert_item_with_return, item.getPropertiesArray(), (err, res) => {
                if (err) {
                    console.log("Error:", err)
                } else {
                    console.log("Inside insert_item_with_return", res)
                }
            })
    }
}

// select an item for a user with id
export function getItemsForUserWithId(response: Response, userId: string) {
    query(get_user_item, [userId], (err, res) => {
        if (err) {
            console.log("Error:", err)
        } else {
            console.log("Inside get_user_item", res.rows)
            response.send({'result' : res.rows})
        }
    })
}
