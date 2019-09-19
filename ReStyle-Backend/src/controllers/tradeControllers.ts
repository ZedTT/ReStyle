/**
 * A module containing all the methods to handle the database queries that involve trades.
 */

import { query, connect } from "../db/dbInit";
import { Response } from "express";
import { new_trade_request_with_return, get_trade_request_inbox_details, status_update_trade_request, add_swap_with_return, item_add_swapID } from "../db/sql_library";
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
            response.send(res.rows);
        }
    });
}

/**
 * For trade requests inbox page. Sets a status for a given trade request after
 * a user clicks on Accept or Reject button.
 * If status of the trade request is Accepted, adds swap record 
 * and updates item records with swapID.
 * 
 * @param response response object to send a response 
 * @param tradeRequestId an ID of a trade request which status needs to be changed
 * @param status can be only 'Accept' or 'Reject'
 */
export function updateTradeRequestStatus(response: Response, tradeRequestId: number, status: string) {
    connect(async (err, client, done) => {
        try {
            // Updates the trade request table with a new status, either Accept or Reject.
            // Returns the rows that were updated.
            const tradeRequestRes = await client.query(status_update_trade_request, [status, tradeRequestId]);

            if (tradeRequestRes.rows.length !== 1) {
                response.send({ error: `Trade request with id: ${tradeRequestId} was NOT updated.` });
                // Stop executing on error.
                return;
            }

            // If status of the trade request is Accepted: add swap record and update item with swapID.
            if (status.match('Accept')) {
                const requester_userID = tradeRequestRes.rows[0].requester_userid1;
                const notified_userID = tradeRequestRes.rows[0].notified_userid2;
                let swappedItems = tradeRequestRes.rows[0].requester_itemarray1;

                swappedItems = swappedItems.concat(tradeRequestRes.rows[0].notified_itemarray2);

                const swapRes = await client.query(add_swap_with_return, [requester_userID, notified_userID]);

                if (swapRes.rows.length !== 1) {
                    response.send({ error: `Swap for users with id: ${requester_userID} and ${notified_userID} was NOT created.` });
                    // Stop executing on error.
                    return;
                }

                const swapID = swapRes.rows[0].swapid;
                const itemRes = await client.query(item_add_swapID, [swapID, swappedItems]);

                if (itemRes.rows.length !== 1) {
                    response.send({ error: `Swap with id: ${swapID} was NOT added for items.` });
                    // Stop executing on error.
                    return;
                }
            }

            response.send({ message: `Trade request with id: ${tradeRequestId} was updated successfully to ${status}.` });

        } catch (e) {
            console.log("Error inside status_update_trade_request query: ", e.message);
            response.send({ error: e.message });

        } finally {
            client.release()
        }
    });
}
