'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');
const fetch = require("node-fetch");
const admin = require('firebase-admin');

const serviceAccount = require("./scanning-database-firebase-credentials.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://scanning-database.firebaseio.com"
});

const db = admin.firestore();

app.use('/', express.static('frontend-angular/dist/frontend-angular')); ///middle-ware

app.get('/', (req,res) => {
  let options = {
    root: path.join(__dirname, 'frontend-angular/dist/frontend-angular')
  }
  return res.status(200).sendFile('index.html', options);
});

app.get('/text', async (req,res) => {

  const api_key = 'dc6zaTOxFJmzC';
  const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${api_key}&tag=cat`)
                               .then(res => res.json())
                              //  .then(function (json) {
                              //   console.log(json);
                              // })
  console.log("Response is : " + response);
  ////////set two instances in firebase
  // let docRef = db.collection('users').doc('alovelace');

  // let setAda = docRef.set({
  //   first: 'Ada',
  //   last: 'Lovelace',
  //   born: 1815
  // });

  // let aTuringRef = db.collection('users').doc('aturing');

  // let setAlan = aTuringRef.set({
  //   'first': 'Alan',
  //   'middle': 'Mathison',
  //   'last': 'Turing',
  //   'born': 1912
  // });
  //////////////////////////////////////////////////////
  //res.status(200).send(setAda+setAlan);
  res.status(200).send(response);
  //const searchString = `q=${req.query.q}`;
  //console.log(searchString.toString());
});

app.get('/firestore', async (req,res) => {
  //get data from my firebase
  db.collection('users').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data()); ///automatically update the data every about 2 mins
      console.log(Date.now().toString());      
    });
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });

})



app.listen(port, () => {
  console.log(`Server is running at PORT ${port}`);
});

module.exports = app;

////////////////////////////CloudSQL for MySQL part -- deprecated -- we are collecting RAW data better to be in the format of NoSQL//////////////////////////
// var mysql = require('mysql');
// var bodyParser = require('body-parser');

// app.use(bodyParser.json())

// var connection = mysql.createConnection({
//   host: 'localhost:3306',  /// <== change to CloudSQL for MySQL expose port
//   user: 'Peiran',  /// <== change
//   password: 'thepassword',
//   database: 'scanning-database'
// });
// connection.connect(err => {
//   if (err) {throw err;}
//   else { console.log('Connected to MySQL'); }
// });
// var event = {  //<== a dummy event for test
//   Barcode: '112A2$$$$$$$$0013010601',
//   Production_Batch: 1,
//   Recipe_and_P: "A2",
//   Timestamp: "6:29:24 AM",
//   Date: "3/12/2020",
//   Seq_Code: "0001 of 0106",
//   Week: 12,
//   Team_Leader: "iXUsr_Siti Rahmah Siregar 6092;",
//   Replenisher: "Dummy;",
//   Pickers: "Dummy;Dummy;Dummy;",
//   Notes: "",
//   Missing_Products:""
// };

// connection.query('INSERT INTO scanning-database SET ?', event, function(error, result, field) {
//   if (error) {
//     //console.error(err);
//     //return;
//     throw error;
//   }
//   console.log(result);
//   console.log(field);
// });

// app.post('/insert', function(req, res) {

//   var jsondata = req.body;
//   var values = [];

//   for(var i=0; i< jsondata.length; i++)
//     values.push([jsondata[i].name,jsondata[i].age]);

//   //Bulk insert using nested array [ [a,b],[c,d] ] will be flattened to (a,b),(c,d)
//   connection.query('INSERT INTO members (name, age) VALUES ?', [values], function(err,result) {
//     if(err) {
//        res.send('Error');
//     }
//    else {
//        res.send('Success');
//     }
//   });
//   });
/////////////////////////////////////////end here///////
