import { Express } from "express";
import { getIncomingTradeRequestsForUser, updateTradeRequestStatus } from '../controllers/tradeControllers';

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
            const tradeRequestId = request.body.tradeRequestId;
            const status = request.body.status;
            updateTradeRequestStatus(response, tradeRequestId, status)
        })
}

export default tradeRequestRoutes;
