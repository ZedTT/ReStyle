import { Express } from "express";
import { getIncomingTradeRequestsForUser, updateTradeRequestStatus, updateTradeRequestStatusAndCreateSwapId } from '../controllers/tradeControllers';

const tradeRequestRoutes = (app: Express) => {

    /**
     * Routes for trade request inbox page.
     */
    app.route('/api/traderequests')
        // To get all the incoming pending requests where a currently logged-in user is a notified user.
        .get((request, response) => {
            getIncomingTradeRequestsForUser(response, request.query.uid);
        })

        // To change a status of a specific trade request.
        .post((request, response) => {
            const tradeRequest = request.body.tradeRequest;
            console.log(tradeRequest);
            const tradeRequestId = tradeRequest.trade_requestid;
            const status = request.body.status;
            if (status === 'Reject') {
                updateTradeRequestStatus(response, tradeRequestId, status)
            } else if (status === 'Accept') {
                updateTradeRequestStatusAndCreateSwapId(response, tradeRequest, status)
            } else {
                response.send({ error: `${status} is not valid. Only 'Accept' or 'Reject' are accepted.` });
            }
        })
}

export default tradeRequestRoutes;
