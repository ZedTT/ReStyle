/**
 * A module containing all the methods to handle the database queries that involve trades.
 */

import { query } from "../db/dbInit";
import { Response } from "express";
import { new_trade_request_with_return, get_trade_request_inbox_details, status_update_trade_request } from "../db/sql_library";
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


/**
 * For trade requests inbox page. Gets all the incoming pending (with status == null) requests 
 * where a currently logged-in user is a notified user.
 *  
 * @param response response object to send a response 
 * @param notifiedUserId the id of the currently logged-in user
 */
export function getIncomingTradeRequestsForUser(response: Response, notifiedUserId: string) {
    query(get_trade_request_inbox_details, [notifiedUserId], (err, res) => {
        if (err) {
            console.log("Error inside get_trade_request_inbox_details query: ", err.message);
            response.send({ error: err.message });
        } else {
            console.log(res.rows);
            response.send(res.rows);
        }
    });
}

/**
 * For trade requests inbox page. Sets a status for a given trade request after
 * a user clicks on Accept or Reject button.
 * 
 * @param response response object to send a response 
 * @param tradeRequestId an ID of a trade request which status needs to be changed
 * @param status can be only 'Accept' or 'Reject'
 */
export function updateTradeRequestStatus(response: Response, tradeRequestId: number, status: string) {
    query(status_update_trade_request, [status, tradeRequestId], (err, res) => {
        if (err) {
            console.log("Error inside status_update_trade_request query: ", err.message);
            response.send({ error: err.message });
        } else {
            console.log(res.rows);
            if (res.rows.length == 1) {
                response.send({ message: `Trade request with id: ${tradeRequestId} was updated successfully to ${status}.` });
            } else {
                response.send({ error: `Trade request with id: ${tradeRequestId} was NOT updated.` });
            }
        }
    });
}
