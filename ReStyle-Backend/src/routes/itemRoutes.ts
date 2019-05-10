import { Express } from 'express';
import { insertItemForUserWithId } from '../controllers/itemControllers';
import { TradeItemModel } from '../models/tradeItemModel';
import { TradeItemInterface } from '../models/TradeItemInterface';

const itemRoutes = (app: Express) => {

    app.route('/api/items')
        // to add a new item to the db
        .post((request, response) => {

            console.log("Inside adding new item route, request body: ", request.body)

            let item = new TradeItemModel(request.body)

            // insert the new user into the DB
            insertItemForUserWithId(response, item)
        })
}

export default itemRoutes