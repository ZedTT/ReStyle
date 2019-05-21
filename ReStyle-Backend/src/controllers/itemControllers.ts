/**
 * A module containing all the methods to handle the database queries that involve items.
 */

import { query } from "../db/dbInit";
import { insert_item_with_return, get_user_item, get_user_item_data } from "../db/sql_library";
import { Response } from "express";
import { AddItemModel } from "../models/AddItemModel";
import { ItemCardInterface } from '../models/ItemCardInterface';
import { TradeItemInterface } from '../models/TradeItemInterface';

/**
 * Inserts an item to the db using the user uid.
 * Used on Add New Item page.
 * 
 * @param response an object to send a response back to frontend
 * @param item an AddItemModel instance that contains all the needed data entered by a user
 */
export function insertItemForUserWithId(
  response: Response,
  item: AddItemModel
) {
  if (item.getSize() < 0 || item.getSize() > 4) {
    response.send({
      error:
        "Invalid size. Expected from 0 to 4 included. Actual: " + item.getSize()
    });
  } else {
    query(insert_item_with_return, item.getPropertiesArray(), (err, res) => {
      if (err) {
        console.log("Error:", err);
      } else {
        response.send({ message: "New item was added" });
      }
    });
  }
}

/**
 * Gets all the items that are owned by a user with id.
 * Used on Trade Request page and Inventory page.
 * 
 * @param response an object to send a response back to frontend
 * @param userId an id of the user whose items are requested
 */
export function getItemsForUserWithId(response: Response, userId: string) {
  query(get_user_item, [userId], (err, res) => {
    if (err) {
      console.log("Error:", err);
    } else {
      console.log("Inside get_user_item", res.rows);
      response.send({ result: res.rows });
    }
  });
}

/**
 * Gets items to display on the home page for a user with a specific id who is signed in at the current moment.
 * If no user is logged in, userId is expected to be null and all the items that exist in the database will be returned.
 * 
 * Used on Home page.
 * 
 * @param response an object to send a response back to frontend
 * @param userId an id of the currently logged in user OR null
 */
export function getItemsToDisplayForUserWithId(response: Response, userId: string) {
  query(get_user_item_data, [userId], (err, res) => {
    if (err) {
      console.log("Error inside getItemsToDisplayForUserWithId:", err);
      response.send({ error: err.message });
    } else {
      // console.log('\nDatabase response: ', res.rows)
      let itemsToSend: ItemCardInterface[] = [];
      for (let itemRecord of res.rows) {
        itemsToSend.push({
          itemId: itemRecord.itemid,
          itemPicturePath: itemRecord.photopaths,
          bookmarked: false, // to be implemented
          userId: itemRecord.userid,
          userName: itemRecord.username,
          userPicturePath: itemRecord.userphotopath,
          userVerified: true, // to be implemented
          userRating: itemRecord.swapscore,
          title: itemRecord.title,
          size: itemRecord.size,
          category: itemRecord.category,
          description: itemRecord.description
        })
      }
      // console.log('\nitemsToSend: ', itemsToSend)
      response.send(itemsToSend);
    }
  })
}

/**
 * Gets all the items that are owned by a specific user and are eligible for trading, 
 * i.e. they haven't been swapped before (their swapId is null).
 * 
 * @param response an object to send a response back to frontend
 * @param userId an id of the owner of the items
 */
export function getTradeItemsForTheUserWithId(response: Response, userId: string) {
  query(get_user_item, [userId], (err, res) => {
    if (err) {
      console.log("Error inside getTradeItemsForTheUserWithId:", err);
      response.send({ error: err.message });
    } else {
      let itemsToSend: TradeItemInterface[] = [];
      for (let itemRecord of res.rows) {
        itemsToSend.push({
          itemId: itemRecord.itemid,
          picturePath: itemRecord.photopaths,
          title: itemRecord.title,
          description: itemRecord.description,
          size: itemRecord.size,
          category: itemRecord.category
        })
      }
      // console.log('\nitemsToSend: ', itemsToSend)
      response.send(itemsToSend);
    }
  })
}
