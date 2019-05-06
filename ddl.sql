DROP TABLE IF EXISTS dev.restyle_user CASCADE;
DROP TABLE IF EXISTS dev.rating CASCADE;
DROP TABLE IF EXISTS dev.contact_details CASCADE;
DROP TABLE IF EXISTS dev.address CASCADE;
DROP TABLE IF EXISTS dev.swap CASCADE;
DROP TABLE IF EXISTS dev.item CASCADE;
DROP TABLE IF EXISTS dev.photos CASCADE;
DROP TABLE IF EXISTS dev.bookmark CASCADE;
DROP TABLE IF EXISTS dev.hide CASCADE;
DROP TABLE IF EXISTS dev.trade_request CASCADE;

CREATE TABLE dev.restyle_user(

	userID CHARACTER(28) PRIMARY KEY, 
	swapScore NUMERIC(2,1) CHECK (swapScore > 0 AND swapScore <= 5),
	userName TEXT

);

CREATE INDEX idx_restyle_user_id ON dev.restyle_user(userID);

CREATE TABLE dev.rating(

	ratingID SERIAL PRIMARY KEY, 
	userID CHARACTER(28) REFERENCES dev.restyle_user,
	rating NUMERIC(1,1) CHECK (rating > 0 AND rating <= 5)

);

CREATE INDEX idx_rating_id ON dev.rating(ratingID);

CREATE TABLE dev.hide(

	hideID SERIAL PRIMARY KEY,
	userID CHARACTER(28) REFERENCES dev.restyle_user,
	items ITEM []
);

CREATE INDEX idx_hide_id ON dev.hide(hideID);

CREATE TABLE dev.contact_details(

	contactDetailsID SERIAL PRIMARY KEY, 
	userID CHARACTER(28) REFERENCES dev.restyle_user,
	email TEXT,
	phoneNumber VARCHAR(10),
	preferredMethodOfContact TEXT
		CHECK (preferredMethodOfContact = 'Phone' OR preferredMethodOfContact = 'Email')
);

CREATE INDEX idx_contact_details_id ON dev.contact_details(contactDetailsID);

CREATE TABLE dev.address(

	addressID SERIAL PRIMARY KEY, 
	userID CHARACTER(28) REFERENCES dev.restyle_user,
	unit TEXT,
	street TEXT,
	city TEXT 
);

CREATE INDEX idx_address_id ON dev.address(addressID);

CREATE TABLE dev.swap(

	swapID SERIAL PRIMARY KEY, 
	userID1 CHARACTER(28) REFERENCES dev.restyle_user(userID),
	userID2 CHARACTER(28) REFERENCES dev.restyle_user(userID)
);

CREATE INDEX idx_swap_id ON dev.swap(swapID);

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
	category TEXT
);

CREATE INDEX idx_item_id ON dev.item(itemID);


CREATE TABLE dev.photos(

	photoID SERIAL PRIMARY KEY, 
	itemID INTEGER REFERENCES dev.item,
	picturePath VARCHAR(20)
);

CREATE INDEX idx_photo_id ON dev.photos(photoID);

CREATE TABLE dev.bookmark(

	bookmarkID SERIAL PRIMARY KEY, 
	userID CHARACTER(28) REFERENCES dev.restyle_user,
	itemID INTEGER REFERENCES dev.item,
	bookmark boolean,
	bookmarkTimeStamp timeStamp 
);

CREATE INDEX idx_bookmark_id ON dev.bookmark(bookmarkID);

CREATE TABLE dev.trade_request(

	trade_requestID SERIAL PRIMARY KEY,
	userID1 CHARACTER(28) REFERENCES dev.restyle_user,
	userID2 CHARACTER(28) REFERENCES dev.restyle_user,
	itemArray1 INTEGER [],
	itemArray2 INTEGER []

);

CREATE INDEX idx_trade_request_id ON dev.trade_request(trade_requestID);

