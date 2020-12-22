# Real Estate API Backend Database 

Write an api that can be used to track sample real estate listing data. Create a simple database that can hold
listing data(mls_number, address, listing date, price, agent, etc). The api should be able to:
● create new listings
● retrieve listings (get by mls number, agent, etc)
● update listing data
● remove listings by mls number

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)
- [Postman](https://www.postman.com/)
- [Postico](https://eggerapps.at/postico/)

## Create database and table

Create a new database called `RealEstateAPI` and create several tables: `realestatelisting`,`realestateagent`, and `realestatephotos` tables and add insert data into each table:

```SQL
CREATE TABLE "realestatelisting" (
  "id" SERIAL PRIMARY KEY,
  "MLS_number"  VARCHAR(50) NOT NULL,
  "listing_agent"  VARCHAR(120) NOT NULL,
  "agent_id" VARCHAR(30),
  "listing_price_US_dollars" VARCHAR(20) NOT NULL,
  "listing_date" VARCHAR(20) NOT NULL,
  "address1" VARCHAR(200) NOT NULL,
  "address2" VARCHAR(200),
  "city" VARCHAR(30) NOT NULL,
  "state" VARCHAR(2) NOT NULL,
  "postal_code" VARCHAR(15) NOT NULL,
  "description" TEXT NOT NULL
);

CREATE TABLE "realestateagent" (
	"id" SERIAL PRIMARY KEY,
	"agent_id" VARCHAR(30) NOT NULL,
	"agent_full_name" VARCHAR(70) NOT NULL,
	"agent_phone_number1" VARCHAR(15) NOT NULL,
	"agent_phone_number2" VARCHAR(15),
	"agent_email" VARCHAR(30) NOT NULL
);

CREATE TABLE "realestatephotos" (
  "id" SERIAL PRIMARY KEY,
  "MLS_number"  VARCHAR(50) NOT NULL,
  "photo"  VARCHAR(256) NOT NULL
);

INSERT INTO "realestatelisting" ("MLS_number", "listing_agent", "listing_price_US_dollars", "listing_date", "address1", "address2", "city", "state", "postal_code",  "description" )
VALUES 
('SH1234', 'Susannah Harris', '210,000', '10/05/2020', '1234 Houseway Lane', NULL, 'Minneapolis', 'MN', '55413', 'Beautiful two bedroom one bathroom 1960s Craftsman bungalow in a hip neighborhood. New windows, new furnace, check it out!'),
('SH1234', 'Susannah Harris', '240,500', '11/25/2020', '1234 Houseway Rd', NULL, 'St Paul', 'MN', '55413', 'Really nice, kind of'),
('SH1234', 'Susannah Harris', '176,000', '03/12/2020', '7890 Road Lane', 'Unit B24', 'Bloomington', 'MN', '55413', 'Brand new duplex available, just built'),
('KC1234', 'Keith Cullinan', '320,000', '12/01/2020', '3456 Turnpike Rd', 'apartment 3', 'Eden Prairie', 'MN', '55413', 'Decent house, Dutch colonial 4 bed 4 bath'),
('KC1234', 'Keith Cullnan', '1,000,000', '06/30/2020', '1112 BigHouseRoad Lane', NULL, 'Wayzata', 'MN', '55413', 'big big house, tennis courts, pool, 10 bed 6 full bath');

INSERT INTO "realestatephotos" ("MLS_number", "photo")
VALUES 
('SH1234','SHhouse1/image1'),
('SH1234','SHhouse1/image2'),
('SH1234','SHhouse1/image3'),
('KC1234','KChouse1/image1'),
('KC1234','KChouse2/image2');

INSERT INTO "realestateagent" ("agent_id", "agent_full_name", "agent_phone_number1", "agent_phone_number2", "agent_email")
VALUES
('Home138', 'Susannah Harris', '612.803.3703', '612.867.5309', 'susannah@homespotter.com'),
('Home139', 'Keith Cullinan', '612.111.1112', NULL, 'keith@homespotter.com');

## Development Setup Instructions

* Run `npm install`
* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server` to start the server
* Run `npm run client` to start the client
* Navigate to `localhost:5000`


## Base Mode

1. Add `server.js` to the project to make an API request. The route `http://localhost:5000/api/realestatelisting` returns an array of homes currently listed. 
2. The server `post` route is available at `http://localhost:5000/api/`.
1. The server `delete` route is available at `http://localhost:5000/api/:id`,  for the home with the `id` of `1`.


# Additional Notes/Comments 

1. The database calls to create, fill, and combine have been tested and verified to work using Postico, localhost servers, and Postgres.  
2. The server calls for CRUD (create, read, update, delete), have been checked using Postman. 