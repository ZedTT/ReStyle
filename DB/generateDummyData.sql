/*
	Author: Catreana Cunningham
	Date: April 30, 2019
*/

/*
	Testing inserting data into restyle user table

	Adding six users 
	Userids created in Firebase 

*/
INSERT INTO dev.restyle_user VALUES 
('QqJVsgMeiVcF1bW0x9b28sHK9fh2', 5.0, 'Zack', 'zack_avatar.jpg'),
('nsisodvqeNOTDCitaseopWjovEJ2', 5.0, 'Haejoon', 'haejoon_avatar.jpg'),
('fBzo9P6FJYQRbPq5CZFEsPWqtU23', 5.0, 'Mary Lamb', 'marylamb_avatar.png'),
('IDrpipjIpYOtcpGAaMT8ZWGT0J32', 4.0, 'Amy Brown', 'amybrown_avatar.png'),
('4WiXU5rgqRWrGZSJXxSkQl3Kpdz1', 3.5, 'John Doe', 'johndoe_avatar.jpg'),
('rCjzKDG6rjUwjj6I5BepsLbvgPr1', 5.0, 'Nathan Green', 'nathangreen_avatar.jpg');



/*
	Testing inserting data into item table

	Items assigned to all six users
*/
INSERT INTO dev.item (userID, swapID , description, gender, size, title, category, photoPaths) 
VALUES  
('QqJVsgMeiVcF1bW0x9b28sHK9fh2',NULL, 'Female Dress lightly used', 'Female', 1, 'Female Dress', 'Dress','{dress_female_03.jpg}'),
('QqJVsgMeiVcF1bW0x9b28sHK9fh2', NULL ,'Female Dress brand new', 'Female', 2, 'Female Dress', 'Dress', '{dress_female_04.jpg}'),
('QqJVsgMeiVcF1bW0x9b28sHK9fh2', NULL ,'Dress Male lightly used', 'Male', 3, 'Dress Male', 'Dress', '{dress_male_01.jpg}'),
('nsisodvqeNOTDCitaseopWjovEJ2', NULL ,'Dress Male brand new', 'Male', 4, 'Dress Male', 'Dress', '{dress_male_02.jpg}'),
('nsisodvqeNOTDCitaseopWjovEJ2', NULL ,'Sweater male lightly used', 'Male', 1, 'Sweater Male', 'Sweater', '{sweater_male_05.jpg}'),
('nsisodvqeNOTDCitaseopWjovEJ2', NULL ,'Female Jeans brand new', 'Female', 2, 'Female Jeans', 'Pants', '{jeans_female_03.jpg}'),
('fBzo9P6FJYQRbPq5CZFEsPWqtU23', NULL ,'Female Jeans lightly used', 'Female', 3, 'Female Jeans', 'Pants', '{jeans_female_04.jpg}'),
('fBzo9P6FJYQRbPq5CZFEsPWqtU23', NULL ,'Male Jeans brand new', 'Male', 4, 'Male Jeans', 'Pants', '{jeans_male_01.jpg}'),
('fBzo9P6FJYQRbPq5CZFEsPWqtU23', NULL ,'Male Jeans lightly used', 'Male', 1, 'Male Jeans', 'Pants', '{jeans_male_02.jpg}'),
('IDrpipjIpYOtcpGAaMT8ZWGT0J32', NULL ,'Unisex Jeans brand new', 'Unisex', 1, 'Unisex Jeans', 'Pants', '{jeans_unisex_05.jpg}'),
('IDrpipjIpYOtcpGAaMT8ZWGT0J32', NULL ,'Shirt Female lightly used', 'Female', 1, 'Shirt Female', 'Shirts', '{shirt_female_03.jpg}'),
('IDrpipjIpYOtcpGAaMT8ZWGT0J32', NULL ,'Shirt Female brand new', 'Female', 4, 'Shirt Female', 'Shirts', '{shirt_female_04.jpg}'),
('4WiXU5rgqRWrGZSJXxSkQl3Kpdz1', NULL ,'Shirt Male lightly used', 'Male', 1, 'Shirt Male', 'Shirts', '{shirt_male_01.jpg}'),
('4WiXU5rgqRWrGZSJXxSkQl3Kpdz1', NULL ,'Shirt Male brand new', 'Male', 1, 'Shirt Male', 'Shirt', '{shirt_male_02.jpg}'),
('4WiXU5rgqRWrGZSJXxSkQl3Kpdz1', NULL ,'Dress Unisex lightly used', 'Unisex', 1, 'Dress Unisex', 'Dress', '{dress_unisex_05.jpg}'),
('rCjzKDG6rjUwjj6I5BepsLbvgPr1', NULL ,'Skirt Female brand new', 'Female', 4, 'Skirt Female', 'Skirt', '{skirt_female_03.jpg}'),
('rCjzKDG6rjUwjj6I5BepsLbvgPr1', NULL ,'Skirt Female lightly used', 'Female', 1, 'Skirt Female', 'Skirt', '{skirt_female_04.jpg}'),
('rCjzKDG6rjUwjj6I5BepsLbvgPr1', NULL ,'Unisex Skirt brand new', 'Unisex', 2, 'Unisex Skirt', 'Skirt', '{skirt_unisex_05.jpg}'),
('rCjzKDG6rjUwjj6I5BepsLbvgPr1', NULL ,'Female Sweater lightly used', 'Female', 3, 'Female Sweater', 'Outerwear', '{sweater_female_04.jpg}'),
('rCjzKDG6rjUwjj6I5BepsLbvgPr1', NULL ,'Female Sweater brand new', 'Female', 4, 'Female Sweater', 'Outerwear', '{sweater_female_05.jpg}');

/*
	Testing inserting data into rating table

	Three ratings per user
*/
INSERT INTO dev.rating (userID, rating) VALUES 
('QqJVsgMeiVcF1bW0x9b28sHK9fh2', 2.0),
('QqJVsgMeiVcF1bW0x9b28sHK9fh2', 3.0),
('QqJVsgMeiVcF1bW0x9b28sHK9fh2', 4.0),
('nsisodvqeNOTDCitaseopWjovEJ2', 4.5),
('nsisodvqeNOTDCitaseopWjovEJ2', 3.5),
('nsisodvqeNOTDCitaseopWjovEJ2', 1.5),
('fBzo9P6FJYQRbPq5CZFEsPWqtU23', 4.2),
('fBzo9P6FJYQRbPq5CZFEsPWqtU23', 4.2),
('fBzo9P6FJYQRbPq5CZFEsPWqtU23', 4.2),
('IDrpipjIpYOtcpGAaMT8ZWGT0J32', 4.8),
('IDrpipjIpYOtcpGAaMT8ZWGT0J32', 4.8),
('IDrpipjIpYOtcpGAaMT8ZWGT0J32', 4.8),
('4WiXU5rgqRWrGZSJXxSkQl3Kpdz1', 1.5),
('4WiXU5rgqRWrGZSJXxSkQl3Kpdz1', 1.5),
('4WiXU5rgqRWrGZSJXxSkQl3Kpdz1', 1.5),
('rCjzKDG6rjUwjj6I5BepsLbvgPr1', 2.5),
('rCjzKDG6rjUwjj6I5BepsLbvgPr1', 2.5),
('rCjzKDG6rjUwjj6I5BepsLbvgPr1', 2.5);

/*
	Testing inserting data into trade request table

	User1 wants to request a trade of their items 1,2,3 for user2 item 4
*/
INSERT INTO dev.trade_request 
(requester_userID1, notified_userID2, requester_itemArray1, notified_itemArray2, status) 
VALUES 
('QqJVsgMeiVcF1bW0x9b28sHK9fh2', 'nsisodvqeNOTDCitaseopWjovEJ2', '{1, 2, 3}', '{4}', NULL);

/*
	Testing inserting data into contact details table

	Contact details added to all six users
*/
INSERT INTO dev.contact_details (userID, email, phoneNumber, preferredMethodOfContact) VALUES 
('QqJVsgMeiVcF1bW0x9b28sHK9fh2', 'testuser1@test.aa', '6041234567', NULL),
('nsisodvqeNOTDCitaseopWjovEJ2', 'testuser2@test.aa', '6041234567', NULL),
('fBzo9P6FJYQRbPq5CZFEsPWqtU23', 'testuser3@test.aa', '6041234567', NULL),
('IDrpipjIpYOtcpGAaMT8ZWGT0J32', 'testuser4@test.aa', '6041234567', NULL),
('4WiXU5rgqRWrGZSJXxSkQl3Kpdz1', 'testuser5@test.aa', '6041234567', NULL),
('rCjzKDG6rjUwjj6I5BepsLbvgPr1', 'testuser6@test.aa', '6041234567', NULL);

/*
	Testing inserting data into address table

	Addresses for all six dummy users
*/
INSERT INTO dev.address (userID, unit, street, city, postalCode) VALUES 
('QqJVsgMeiVcF1bW0x9b28sHK9fh2', 'testUnit', 'testStreet', 'Vancouver', 'V5K 0A1'),
('nsisodvqeNOTDCitaseopWjovEJ2', 'testUnit', 'testStreet', 'Vancouver', 'V5K 1A1'),
('fBzo9P6FJYQRbPq5CZFEsPWqtU23', 'testUnit', 'testStreet', 'Vancouver', 'V5K 1A4'),
('IDrpipjIpYOtcpGAaMT8ZWGT0J32', 'testUnit', 'testStreet', 'Vancouver', 'V5K 1A5'),
('4WiXU5rgqRWrGZSJXxSkQl3Kpdz1', 'testUnit', 'testStreet', 'Vancouver', 'V5K 1A6'),
('rCjzKDG6rjUwjj6I5BepsLbvgPr1', 'testUnit', 'testStreet', 'Vancouver', 'V5K 1A7');



/*
	Testing inserting data into swap table

	User1 and user2
*/
INSERT INTO dev.swap  (userID1, userID2)
VALUES  ('QqJVsgMeiVcF1bW0x9b28sHK9fh2','nsisodvqeNOTDCitaseopWjovEJ2');

/*
	Testing inserting data into hide table

	User1 wants to hide items 4,14,17
	User2 wants to hide items 10,11,12
*/
INSERT INTO dev.hide 
(userID, items) 
VALUES 
('QqJVsgMeiVcF1bW0x9b28sHK9fh2', '{}'),
('nsisodvqeNOTDCitaseopWjovEJ2', '{}'),
('fBzo9P6FJYQRbPq5CZFEsPWqtU23', '{}'),	
('IDrpipjIpYOtcpGAaMT8ZWGT0J32', '{}'),	
('4WiXU5rgqRWrGZSJXxSkQl3Kpdz1', '{}'),	
('rCjzKDG6rjUwjj6I5BepsLbvgPr1', '{}');


