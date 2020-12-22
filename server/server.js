const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const pool = require('./modules/pool')

console.log(pool);
/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for angular requests
app.use(express.static('build'));


/** ---------- Routes ---------- **/

app.get('/', (req, res) => {
  console.log("Server is running");
  res.sendStatus(200);
})

app.get('/realestatelisting', (req, res) => {
  const queryText = `SELECT * FROM "realestatelisting" ORDER BY "MLS_number"`
  pool.query(queryText)
    .then((result) => { 
      res.send(result.rows); })
      console.log(result);
    .catch((err) => {
      console.log('Error completing SELECT real estate listing query', err);
      res.sendStatus(500);
  });
});



app.get('/specific_home_photos', (req, res) => {
  pool.query(`SELECT * FROM "realestatelisting"
    JOIN "realestateagent"
    ON "realestatelisting"."agent_id"="realestateagent"."agent_id"

    JOIN "realestatephotos"
    ON "realestatelisting"."MLS_number"="realestatephotos"."MLS_number"

    WHERE "specific_home_photos"."house_id"=$1;`, [req.query.MLS_number])
    .then((response) => { 
      res.send(response.rows); 
    })
    .catch((err) => {
      console.log('Error completing SELECT real estate listing query', err);
      res.sendStatus(500);
  });
});


app.post('/', (req, res) => {
  const newHouse = req.body;
  const queryText = `INSERT INTO realestatelisting ("MLS_number", "listing_agent", "agent_id", "listing_price_US_dollars", "listing_date", "address1", "address2", "city", "state", "postal_code",  "description" )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`; 
  const queryValues = [
    newHouse.MLS_number,
    newHouse.listing_agent,
    newHouse.agent_id,
    newHouse.listing_price_US_dollars,
    newHouse.listing_date,
    newHouse.address1,
    newHouse.address2,
    newHouse.city,
    newHouse.state,
    newHouse.postal_code,
    newHouse.description,
  ];
  pool.query(queryText, queryValues)
    .then(() => { res.sendStatus(201); })
    .catch((err) => {
      console.log('Error completing SELECT real estate listing query', err);
      res.sendStatus(500);
  });
});


app.put('/', (req, res) => {
  const updatedHouse = req.body;

  const queryText = `UPDATE "realestatelisting"
  SET 
    "MLS_number" = $1, 
    "listing_agent" = $2, 
    "agent_id" = $3
    "listing_price_US_dollars" = $4, 
    "listing_date" = $5, 
    "address1" = $6, 
    "address2" = $7, 
    "city" = $8
    "state" = $9
    "postal_code" = $10
    "description" = $11
  WHERE id=$12;`;

  const queryValues = [
    updatedHouse.MLS_number,
    updatedHouse.listing_agent,
    updatedHouse.agent_id,
    updatedHouse.listing_price_US_dollars,
    updatedHouse.listing_date,
    updatedHouse.address1,
    updatedHouse.address2,
    updatedHouse.city,
    updatedHouse.state,
    updatedHouse.postal_code,
    updatedHouse.description,
    updatedHouse.id,
  ];

  pool.query(queryText, queryValues)
    .then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error completing SELECT real estate listing query', err);
      res.sendStatus(500);
    });
});


app.delete('/:id', (req, res) => {
  const queryText = `DELETE FROM "realestatelisting" WHERE id=$1`;
  pool.query(queryText, [req.params.id])
    .then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error completing SELECT real estate listing query', err);
      res.sendStatus(500);
  });
});


/** ---------- START SERVER ---------- **/
app.listen(port, function () {
  console.log('Listening on port: ', port);
});