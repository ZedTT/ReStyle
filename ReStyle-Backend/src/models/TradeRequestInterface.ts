
/**
 * A TradeRequestInterface interface that represents a trade request.
 * Used to post a new trade request into the database when a user clicks Request Trade button.
 */
export interface TradeRequestInterface {
    requesterId: string,
    notifiedUserId: string,
    requesterTradeItems: number[], // should be integers
    notifiedUserTradeItems: number[]
}

