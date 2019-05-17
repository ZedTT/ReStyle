export interface TradeRequestInterface {
    requesterId: string, 
    notifiedUserId: string, 
    requesterTradeItems: number[], // should they be integers??? aren't they an array of item ids, that are strings?
    notifiedUserTradeItems: number[]
}