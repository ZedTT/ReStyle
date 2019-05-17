import { query } from "../db/dbInit";
import { Response } from "express";
import { new_trade_request_with_return } from "../db/sql_library";
import { TradeRequestInterface } from '../models/TradeRequestInterface';

export function createNewTradeRequest(response: Response, tradeRequest: TradeRequestInterface) {
    query(new_trade_request_with_return,
        [tradeRequest.requesterId, tradeRequest.notifiedUserId, 
            tradeRequest.requesterTradeItems, tradeRequest.notifiedUserTradeItems], (err, res) => {
            if (err) {
                console.log("Error:", err);
            } else {
                console.log("Inside new_trade_request_with_return", res.rows);
                if (res.rows.length == 1) {
                    response.send({ message: "Trade request added successfully." });
                } else {
                    response.send({ error: "Trade request was not added." });
                }
            }
        })
}