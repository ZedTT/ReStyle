export interface TradeRequestInterface {
    requesterId: string, 
    notifiedUserId: string, 
    requesterTradeItems: number[], // should be integers
    notifiedUserTradeItems: number[]
}

