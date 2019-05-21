
/**
 * A TradeRequestInterface interface that represents a trade request.
 * Used to post a new trade request into the database when a user clicks Request Trade button.
 */
export interface TradeRequestInterface {
    requesterId: string, // the id of the user who requested a trade
    notifiedUserId: string, // the id of the user from whom a trade was requested
    requesterTradeItems: number[], // an array of requester item ids, (should be an array of integers)
    notifiedUserTradeItems: number[] // an array of requestee/notified user item ids, (should be an array of integers)
}

