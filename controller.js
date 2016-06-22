// load the things we need for Frontend
var express = require('express');
var app = express();
// set the view engine to ejs
app.set('view engine', 'ejs');

//MQTT
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')


// Render localhost:8080/
app.get('/', function(req, res) {

    res.render('pages/index', { //render the index.ejs

    // Send Variables to Frontend
    opened:opened,
    forceState: forceState
  });
});

// Send AJAX! on request in /string
app.get("/string", function(req, res) {
    // Send Variable on request
    res.send(forceState.toString())
})

app.listen(8080);
console.log('8080 for the win');


// controller.js


// Define Variables for States of Sensors
var forceState = ''
var connected = true
//var message


var opened = 1;

client.on('connect', () => {

  // Subscribe to chanel
  client.subscribe('comcar/car')

})

client.on('message', (topic, message) => {
  switch (topic) {
    // case 'garage/connected':
    //   return handleGarageConnected(message)

    // If Message in chanel do something
    case 'comcar/car':
       return testCheck(message)
    case 'comcar/shower':
      return showerCheck(message)
    case 'comcar/drawer':
      return drawerCheck(message)
    case 'comcar/bed':
      return bedCheck(message)
       
       
  }

})



function showerCheck (message) {

  forceState = message // Put Value into var: forceState
  console.log('Force Touch %s', message)

  if (connected && forceState == 'used') {
      // Say something?
      //  client.publish('comcar/car', 'true')

     }
  if (forceState == 'true') {
    console.log('KITTENS')
  }

}

function bedCheck (message) {

  forceState = message // Put Value into var: forceState
  console.log('Force Touch %s', message)

  if (connected && forceState == 'used') {
      // Say something?
      //  client.publish('comcar/car', 'true')

     }
  if (forceState == 'true') {
    console.log('KITTENS')
  }

}
function testCheck(message) {

  forceState = message // Put Value into var: forceState
  console.log('Force Touch %s', message)

  if (connected && forceState == 'used') {
      // Say something?
      //  client.publish('comcar/car', 'true')

     }
  if (forceState == 'true') {
    console.log('KITTENS')
  }

}
function drawerCheck (message) {

  forceState = message // Put Value into var: forceState
  console.log('Force Touch %s', message)

  if (connected && forceState == 'used') {
      // Say something?
      //  client.publish('comcar/car', 'true')

     }
  if (forceState == 'true') {
    console.log('KITTENS')
  }

}