/*

	Drop table if the table exists,
	if the table exists and there are 
	dependencies want to drop all the dependencies.

	This is used to clean the database.
*/
DROP TABLE IF EXISTS dev.restyle_user CASCADE;
DROP TABLE IF EXISTS dev.rating CASCADE;
DROP TABLE IF EXISTS dev.contact_details CASCADE;
DROP TABLE IF EXISTS dev.address CASCADE;
DROP TABLE IF EXISTS dev.swap CASCADE;
DROP TABLE IF EXISTS dev.item CASCADE;
DROP TABLE IF EXISTS dev.bookmark CASCADE;
DROP TABLE IF EXISTS dev.hide CASCADE;
DROP TABLE IF EXISTS dev.trade_request CASCADE;

/*
	Restyle user table

	UserID is from Firebase
	swapScore is an average of the ratings
		swapScore > 0 AND swapScore <= 5
	userName is from Firebase
	userPhotoPath is the path to the photo

*/
CREATE TABLE dev.restyle_user(

	userID CHARACTER(28) PRIMARY KEY, 
	swapScore NUMERIC(2,1) CHECK (swapScore > 0 AND swapScore <= 5),
	userName TEXT,
	userPhotoPath TEXT
);

/*
	Create index for the restyle user table
*/
CREATE INDEX idx_restyle_user_id ON dev.restyle_user(userID);

/*
	Rating table

	ratingID is serialized 
	userID from the user table
	rating used to indicate satisfaction with the swap
*/
CREATE TABLE dev.rating(

	ratingID SERIAL PRIMARY KEY, 
	userID CHARACTER(28) REFERENCES dev.restyle_user,
	rating NUMERIC(2,1) CHECK (rating > 0 AND rating <= 5)
);

/*
	Create index for the rating table
*/
CREATE INDEX idx_rating_id ON dev.rating(ratingID);

/*
	Hide table

	hideID is serialized 
	userID from the user table
		constraint: a single user should have a single hideID
	items as an array of items
*/
CREATE TABLE dev.hide(

	hideID SERIAL PRIMARY KEY,
	userID CHARACTER(28) REFERENCES dev.restyle_user UNIQUE,
	items INTEGER []
);

/*
	Create index for the hide table
*/
CREATE INDEX idx_hide_id ON dev.hide(hideID);

/*
	Contact details table

	contactDetailsID is serialized 
	userID from the user table
	email to store the users email
	phoneNumber to store the users phone number
	preferred method of contact to store users preferred contact method
*/
CREATE TABLE dev.contact_details(

	contactDetailsID SERIAL PRIMARY KEY, 
	userID CHARACTER(28) REFERENCES dev.restyle_user,
	email TEXT,
	phoneNumber VARCHAR(10),
	preferredMethodOfContact TEXT
		CHECK (preferredMethodOfContact = 'Phone' OR preferredMethodOfContact = 'Email')
);

/*
	Create index for the contact details table
*/
CREATE INDEX idx_contact_details_id ON dev.contact_details(contactDetailsID);

/*
	Address table

	addressID is serialized 
	userID from the user table
	unit to store the users unit
	street to store the users street
	city to store the users city
	postalCode to store the users postal code
*/
CREATE TABLE dev.address(

	addressID SERIAL PRIMARY KEY, 
	userID CHARACTER(28) REFERENCES dev.restyle_user,
	unit TEXT,
	street TEXT,
	city TEXT,
	postalCode TEXT
);

/*
	Create index for the address table
*/
CREATE INDEX idx_address_id ON dev.address(addressID);

/*
	Swap table
	swapID is serialized 
	userID1 from the user table
	userID2 for the user table
*/
CREATE TABLE dev.swap(

	swapID SERIAL PRIMARY KEY, 
	userID1 CHARACTER(28) REFERENCES dev.restyle_user(userID),
	userID2 CHARACTER(28) REFERENCES dev.restyle_user(userID)
);

/*
	Create index for the swap table
*/
CREATE INDEX idx_swap_id ON dev.swap(swapID);

/*
	Item table

	itemID is serialized 
	userID from the user table
	swapID from the swap table
	description for describing the item
	gender if the item is Male, Female or Unisex
	size of the item, 0: XS, 1: S, 2: M, 3: L, 4: XL
		(size > 0 AND size <= 4)
	title the display title for the item
	category the category the item falls under for filtering
	photoPaths an array of photo paths
*/
CREATE TABLE dev.item(

	itemID SERIAL PRIMARY KEY, 
	userID CHARACTER(28) REFERENCES dev.restyle_user,
	swapID INTEGER REFERENCES dev.swap,
	description TEXT,
	gender TEXT
		CHECK (gender = 'Female' OR gender = 'Male' OR gender = 'Unisex'),
	size INTEGER
		CHECK (size > 0 AND size <= 4),
	title TEXT,
	category TEXT,
	photoPaths TEXT[]
);

/*
	Create index for the item table
*/
CREATE INDEX idx_item_id ON dev.item(itemID);

/*
	Bookmark table

	bookmarkID is serialized
	userID from user table
	itemID from item table
	bookmark as a boolean
	bookmarkTimeStamp as a timeStamp

*/
CREATE TABLE dev.bookmark(

	bookmarkID SERIAL PRIMARY KEY, 
	userID CHARACTER(28) REFERENCES dev.restyle_user,
	itemID INTEGER REFERENCES dev.item,
	bookmark boolean,
	bookmarkTimeStamp timeStamp 
);

/*
	Create index for the bookmark table
*/
CREATE INDEX idx_bookmark_id ON dev.bookmark(bookmarkID);

/*
	Trade request table

	trade_requestID is serialized
	requester_userID1 is the user id for the requester from user table
	notfied_userID2 is the user id 
		for the requestee to be notified from user table
	requester_itemArray1 an array of integers 
		for the items from the requester
	notified_itemArray2 an array of integers 
		for the items for the requestee to be notified
	status of the trade request
		either accept, reject or null

*/
CREATE TABLE dev.trade_request(

	trade_requestID SERIAL PRIMARY KEY,
	requester_userID1 CHARACTER(28) REFERENCES dev.restyle_user,
	notified_userID2 CHARACTER(28) REFERENCES dev.restyle_user,
	requester_itemArray1 INTEGER [],
	notified_itemArray2 INTEGER [],
	status TEXT
		CHECK (status = 'Accept' OR status = 'Reject')
);

/*
	Create index for the trade request table
*/
CREATE INDEX idx_trade_request_id ON dev.trade_request(trade_requestID);

