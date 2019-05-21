/**
 * A module containing all the methods to handle the database queries that involve trades.
 */

import { query } from "../db/dbInit";
import { Response } from "express";
import { new_trade_request_with_return } from "../db/sql_library";
import { TradeRequestInterface } from '../models/TradeRequestInterface';

/**
 * Inserts a record for a new trade request into the database.
 * Used when a user clicks Request Trade button on Request Trade page.
 * 
 * @param response an object to send a response back to frontend
 * @param tradeRequest an instance of TradeRequestInterface that contains the ids of two users 
 * and their items that are proposed as a trade
 */
export function createNewTradeRequest(response: Response, tradeRequest: TradeRequestInterface) {
    query(new_trade_request_with_return,
        [tradeRequest.requesterId, tradeRequest.notifiedUserId,
        tradeRequest.requesterTradeItems, tradeRequest.notifiedUserTradeItems], (err, res) => {
            if (err) {
                console.log("Error:", err);
            } else {
                // console.log("Inside new_trade_request_with_return", res.rows);
                if (res.rows.length == 1) {
                    response.send({ message: "Trade request added successfully." });
                } else {
                    response.send({ error: "Trade request was not added." });
                }
            }
        })
}
