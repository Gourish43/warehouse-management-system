const express= require("express");
const bodyParser= require("body-parser");
const cors= require("cors");
const bcrypt = require('bcrypt');
const port= 5000;
const db= require("./DbConnection");

const floorRoute = require('./routes/floor');
const addProductRoute = require('./routes/addProduct');
const getProductRoute = require('./routes/getProduct');
const getCardColor=require('./routes/updatColor')
const dltProductRoute = require('./routes/dltProduct');
const floorwiseproductRoute = require('./routes/floorwiseproductpriority');
const zotbRoute = require('./routes/zotbdetails');
const outfeedRoute = require('./routes/machineoutfeed');
const infeedRoute = require('./routes/machineinfeed');
const stockdispatchRoute = require('./routes/stockdispatch');
const roleRoute = require('./routes/role');
const usersRoute = require('./routes/users');
const productRoute = require('./routes/product');
const skuRoute = require('./routes/sku');
const dmsRoute = require('./routes/dms');
const positiondmsRoute = require('./routes/dmsposition');
const dockwiseRoute = require('./routes/dockwise');
const bayoutfeedRoute = require('./routes/bayoutfeed');
const faulthistoryRoute = require('./routes/faulthistory');
const loggeractivityRoute = require('./routes/loggeractivity');
const lockactivityRoute = require('./routes/lockactivity');
const emptypalletRoute = require('./routes/emptypallet');
const stockageingRoute = require('./routes/stockageing');
const skudetailsRoute = require('./routes/skudetails');
const skuwisedispatchRoute = require('./routes/skuwisedispatch');
const truckwiseRoute = require('./routes/truckwiseloading');
const stockreportRoute = require('./routes/stockreport');
const locationreportRoute = require('./routes/locationreport');
const skustockRoute = require('./routes/skustock');
const partialinfeedRoute = require('./routes/partialpalletinfeed');
const accesscontrolRoute = require('./routes/manageaccesscontrol');
const liveinfeedRoute = require('./routes/infeedlive');
const BlockPositionRoute=require('./BlockPosition');
const saltRounds = 10; // Number of salt rounds for bcrypt

const app= express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/floor', floorRoute); // Use the floorRoute for handling routes related to the Floor table
app.use('/addProduct', addProductRoute);
app.use('/getProduct', getProductRoute);// Number of salt rounds for bcrypt
app.use('/updatColor', getCardColor);
app.use('/dltProduct', dltProductRoute);
app.use('/floorwiseproductpriority',floorwiseproductRoute);
app.use('/zotbdetails',zotbRoute);
app.use('/machineoutfeed',outfeedRoute);
app.use('/machineinfeed',infeedRoute);
app.use('/stockdispatch', stockdispatchRoute);
app.use('/role', roleRoute);
app.use('/users', usersRoute);
app.use('/product', productRoute);
app.use('/sku', skuRoute);
app.use('/dms', dmsRoute);
app.use('/dmsposition', positiondmsRoute);
app.use('/dockwise', dockwiseRoute);
app.use('/bayoutfeed', bayoutfeedRoute);
app.use('/faulthistory', faulthistoryRoute);
app.use('/loggeractivity', loggeractivityRoute);
app.use('/lockactivity', lockactivityRoute);
app.use('/emptypallet', emptypalletRoute);
app.use('/stockageing', stockageingRoute);
app.use('/skudetails', skudetailsRoute);
app.use('/skuwisedispatch', skuwisedispatchRoute);
app.use('/truckwiseloading', truckwiseRoute);
app.use('/stockreport', stockreportRoute);
app.use('/locationreport', locationreportRoute);
app.use('/skustock', skustockRoute);
app.use('/partialpalletinfeed',partialinfeedRoute);
app.use('/manageaccesscontrol',accesscontrolRoute);
app.use('/infeedlive',liveinfeedRoute);

app.use('/blockposition',BlockPositionRoute);

function generateSessionToken() {
  const tokenLength = 16;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';

  for (let i = 0; i < tokenLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }
  console.log(token);
  return token;
}

// Registration endpoint
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  // Perform validation here

  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, password], (err) => {
    if (err) {
      console.error('Error registering user:', err);
      return res.sendStatus(500);
    }
    return res.sendStatus(200);
  });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // Perform validation here

  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('Error logging in:', err);
      return res.sendStatus(500);
    }
    if (results.length === 0) {
      return res.sendStatus(401);
    }

    // Generate the sessionToken
    const sessionToken = generateSessionToken();

    // Hash the session token
    bcrypt.hash(sessionToken, saltRounds, (err, hashedSessionToken) => {
      if (err) {
        console.error('Error hashing session token:', err);
        return res.sendStatus(500);
      }

      const user = results[0];

      // Update session-related columns in the user table
      const userId = user.id;
      const sessionExpiration = new Date();
      const updateSql =
        'UPDATE users SET sessionToken = ?, sessionExpiration = ?, isLoggedIn = ? WHERE id = ?';
      // Set the session expiration time as needed
      db.query(
        updateSql,
        [hashedSessionToken, sessionExpiration, true, userId],
        (err) => {
          if (err) {
            console.error('Error updating session data:', err);
            return res.sendStatus(500);
          }
          // Set the session token in the response cookie
          res.cookie('sessionToken', sessionToken);
          return res.sendStatus(200);
        }
      );
    });
  });
});

// Logout endpoint
app.get('/logout', (req, res) => {
  // Clear session-related columns in the user table
  const userId = req.user.id;

  console.log('User ID:', userId);

  if (userId) {
    console.log('User ID:', userId);
    // Rest of the code
  } else {
    console.log('User ID not found');
    // Handle the case where the user ID is not available
    return res.sendStatus(401);
  }

  const updateSql =
    'UPDATE users SET sessionToken = NULL, sessionExpiration = NULL, isLoggedIn = ? WHERE id = ?';

  // Wrap the database query in a promise
  const clearSessionData = () => {
    return new Promise((resolve, reject) => {
      db.query(updateSql, [false, userId], (err, result) => {
        if (err) {
          console.error('Error clearing session data:', err);
          reject(err);
        } else {
          console.log('Executed Query:', updateSql);
          console.log('Query Result:', result);
          resolve(result);
        }
      });
    });
  };

  // Call the clearSessionData function and handle the result
  clearSessionData()
    .then((result) => {
      if (result.affectedRows === 0) {
        // No rows were affected, user not found or session data already cleared
        return res.sendStatus(404);
      }

      // Clear the session token in the response cookie
      res.clearCookie('sessionToken');

      // Send the response after clearing the cookie
      return res.sendStatus(200);
    })
    .catch((err) => {
      console.error('Error clearing session data:', err);
      return res.sendStatus(500);
    });
});

app.listen(port, ()=> {
 console.log("Server running on port 5000");
});
module.exports= app;