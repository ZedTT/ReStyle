
/*
	Author: Catreana Cunningham
	Date: May 6, 2019
*/

/*
--------------------------------------------------User Queries-------------------------------
*/

/*
	Insert user into table
	with return to get the row back that was just created

	Array of values, fill with three values: 
	userID character(28) 
	swapScore Numeric(2,1), swapScore > 0 AND swapScore <= 5
	userName text
	userPhotoPath text

	Example:
	['l15CGtMJ5bSnEkRPpYEgyvVWeLt2', 5, 'Haejoon', null]
*/
export const insert_user_with_return = 
"INSERT INTO dev.restyle_user (userID, swapScore, userName, userPhotoPath) "+ 
"VALUES ($1, $2, $3, $4) RETURNING * "

/*
	Insert user into the user table
	without return of the row that was just created
	Array of values, fill with three values:

	userID character(28) 
	swapScore Numeric(2,1), swapScore > 0 AND swapScore <= 5
	userName text
	userPhotoPath text 

	Example:
	['l15CGtMJ5bSnEkRPpYEgyvVWeLt2',1, 'Haejoon', null]
*/
export const insert_user_no_return = 
"INSERT INTO dev.restyle_user (userID, userName, userPhotoPath) "+ 
"VALUES ($1, $2, $3) "

/*
	Get user based on user id from login 
	userID character(28)

	Example:
	['l15CGtMJ5bSnEkRPpYEgyvVWeLt2']

*/
export const get_user = 
"SELECT * FROM dev.restyle_user "+
"WHERE userID = $1"

/*
	Get user rating based on the userID 
	userID character(28)

	Example:
	['l15CGtMJ5bSnEkRPpYEgyvVWeLt2']
*/
export const get_user_rating =
"SELECT AVG(rating) FROM dev.rating " +
"WHERE userID = $1"

/*

	Get the the data from both the item table 
	and the user table

	userID character(28)

	Example:
	[userID]
	['l15CGtMJ5bSnEkRPpYEgyvVWeLt2']
*/
export const get_user_item_data =
"SELECT i.*, u.swapScore, u.userName, u.userPhotoPath " +
"FROM dev.item AS i " +
"INNER JOIN dev.restyle_user AS u " +
"ON i.userID = u.userID " +
"WHERE i.userID != $1 " +
"AND i.swapID IS NULL "

/*
--------------------------------------------------Item Queries----------------------------------
*/


/*
	Insert item into item table
	with return to get the row back that was just created
	userID character(28)
	swapID integer
	description text
	gender text, Male, Female or Unisex
	size integer, (size > 0 AND size <= 4)
	title, category, photoPaths text

	Example:
	['l15CGtMJ5bSnEkRPpYEgyvVWeLt2', null , 'description', 'Female', 1, 'title', 'category', ['path1','path2','path3]]
*/
export const insert_item_with_return =
"INSERT INTO dev.item (userID, description, gender, size, title, category, photoPaths) " +
"VALUES ($1, $2, $3, $4, $5, $6, $7::text[]) RETURNING * "

/*
	Insert item into item table without return 
	userID character(28)
	description text
	gender text, Male, Female or Unisex
	size integer, (size > 0 AND size <= 4)
	title, category, photoPaths text

	Example:
	['l15CGtMJ5bSnEkRPpYEgyvVWeLt2', 'description', 'Female', 1, 'title', 'category', ['path1','path2','path3]]
*/
export const insert_item_no_return =
"INSERT INTO dev.item (userID, description, gender, size, title, category, photoPaths) " +
"VALUES ($1, $2, $3, $4, $5, $6, $7::text[]) "


/*
	Get item(s) for a specific user based on userID
	This is for the user viewing their inventory
	Example:
	[userID]
	['l15CGtMJ5bSnEkRPpYEgyvVWeLt2']
*/
export const get_user_item =
"SELECT * FROM dev.item " +
"WHERE userID = $1 "

/**
 * Get all the items owned by a user that are eligible for trading, i.e. don't have swapID
 */
export const get_user_items_to_trade =
"SELECT * FROM dev.item " +
"WHERE userID = $1 AND swapID IS NULL "

/*
	Get item(s) to display for a user that does not 
	include their own items

	Example:
	[userID]
	['l15CGtMJ5bSnEkRPpYEgyvVWeLt2']
*/
export const display_item =
"SELECT * FROM dev.item " +
"WHERE userID != $1 AND swapID IS NULL "

/*
	Insert the item's photoPath array into the item table
	itemID as an integer
	
	Example:
	[[photoPath1, photoPath2],itemID]
*/
export const add_photoPath_to_item =
"UPDATE dev.item SET photoPaths = array_cat(photoPaths, $1::text[]) " +
"WHERE itemID = $2 "

/*
	Get photos in array for an item

	itemID as an integer

	Example:
	[itemID]

*/
export const get_photos =
"SELECT photoPaths FROM dev.item " +
"WHERE itemID = $1 "

/*
	Display items with pagination

	userID character(28)
	Limit: no more than that many rows will 
			be returned (but possibly less, if the query itself yields less rows)
	
	Example:
	[userID, limit by amount, Offset by amount]
	first page: [userID, 5, 0]
	second page: [userID, 5, 5]
	third page: [userID, 5, 10]
*/
export const display_items_paginated =
"SELECT * FROM dev.item " +
"WHERE userID != $1 AND swapID IS NULL " +
"ORDER BY itemID " + 
"LIMIT $2 OFFSET $3 "

/*
	Update item(s) with swapID

	swapID as an integer
	itemID as an integer

	Example:
	[swapID, [itemID1, itemID2]
	[1, [1, 2]]
*/
export const item_add_swapID =
"UPDATE dev.item SET swapID = $1 " +
"WHERE itemID = Any($2::INT[]) "

/*
--------------------------------------------------Hide Queries-------------------------------
*/

/*
	Insert an item into the hide table
	This is for when the user no longer 
	wishes to see the item in their feed.
	A single user should have a single hide list.
	
	userID character(28)
	items should be initialized as an empty array

	Example:
	[userID, emptyArray]
	['15CGtMJ5bSnEkRPpYEgyvVWeLt2', []]


	note: create an empty array when user is first created/inserted
	into the user table
*/
export const new_user_hide =
"INSERT INTO dev.hide (userID, items) " + 
"VALUES ($1, '{}') " 

/*
	Get hide list for a specific user based on the userID
	userID character(28)

	Example:
	[userID]
	['15CGtMJ5bSnEkRPpYEgyvVWeLt2']
*/
export const get_hide_list =
"SELECT items FROM dev.hide " +
"WHERE userID = $1 "

/*
	Add item to hide table for a specific user

	userID character(28)
	itemID integer

	Note array_append: append an element to the end of an array
	Note: items = array_append(items, $1) is the same as items = items + 1

	Example:
	[itemID, userID]
	[23,'15CGtMJ5bSnEkRPpYEgyvVWeLt2']
*/
export const add_hide =
"UPDATE dev.hide SET items = array_append(items, $1) " +
"WHERE userID = $2 "


/*
	Remove an item from the hide table for a specific user

	userID character(28)
	itemID integer

	Note array_append: append an element to the end of an array

	Example:
	[itemID, userID]
	[23,'15CGtMJ5bSnEkRPpYEgyvVWeLt2']
*/
export const remove_hide =
"UPDATE dev.hide SET items = array_remove(items, $1) " +
"WHERE userID = $2 "

/*
--------------------------------------------------Trade Request Queries-------------------------------
*/

/*
	Create new trade request with return

	requester_userID1 character(28)
	notfied_userID2 character(28)
	requester_itemArray1 an array of integers
	notified_itemArray2 an array of integers
	
	Example:
	[userID, userID, [item1, item2], [item1,item2]]

*/
export const new_trade_request_with_return =
"INSERT INTO dev.trade_request " +
"(requester_userID1, notified_userID2, requester_itemArray1, notified_itemArray2) " +
"VALUES ($1, $2, $3::integer[], $4::integer[]) RETURNING * "

/*
	Create new trade request with no return

	requester_userID1 character(28)
	notfied_userID2 character(28)
	requester_itemArray1 an array of integers
	notified_itemArray2 an array of integers
	
	Example:
	[userID, userID, [item1, item2], [item1,item2]]

*/
export const new_trade_request_no_return =
"INSERT INTO dev.trade_request " +
"(requester_userID1, notified_userID2, requester_itemArray1, notified_itemArray2) " +
"VALUES ($1, $2, $3::integer[], $4::integer[]) "

/*
	Update status for trade request

	tradeRequestID integer

	Example:
	[status, tradeRequestID]
	[Accept/Reject, 1]

*/
export const status_update_trade_request =
"UPDATE dev.trade_request SET status = $1 " +
"WHERE tradeRequestID = $2 "

/*
--------------------------------------------------Swap Queries-------------------------------
*/

/*
	Add swap to swap table after a trade request has been approved
	with return

	userID of requeter: character (28)
	userID of requestee: character (28)

	Example:
	[userID1, userID2]
	['l15CGtMJ5bSnEkRPpYEgyvVWeLt2', 'mD7ZT6d9P1bcrBsdQNRGqVaI30m2']
*/
export const add_swap_with_return =
"INSERT INTO dev.swap " +
"VALUES ($1, $2) RETURNING * "

/*
	Add swap to swap table after a trade request has been approved
	no return

	userID of requeter: character (28)
	userID of requestee: character (28)

	Example:
	[userID1, userID2]
	['l15CGtMJ5bSnEkRPpYEgyvVWeLt2', 'mD7ZT6d9P1bcrBsdQNRGqVaI30m2']
*/
export const add_swap_no_return =
"INSERT INTO dev.swap " +
"VALUES ($1, $2) "




