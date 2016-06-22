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
var sensorCounter = 0;
var bed = false;
var shower = false;
var drawer = false;
var test = false;


client.on('connect', () => {

  // Subscribe to chanel
  client.subscribe('comcar/car')
  client.subscribe('comcar/home/water/1')
  client.subscribe('comcar/home/force/1')

})

client.on('message', (topic, message) => {
  switch (topic) {
    // case 'garage/connected':
    //   return handleGarageConnected(message)

    // If Message in chanel do something
    //case 'comcar/car':
       //return testCheck(message)
    case 'comcar/home/water/1':
      return showerCheck(message)
    case 'comcar/drawer':
      return drawerCheck(message)
    case 'comcar/home/force/1':
      return bedCheck(message)
       
       
  }
})



function showerCheck (message) {

  forceState = message // Put Value into var: forceState

  if (connected && forceState == 'used') {
      // Say something?
      //  client.publish('comcar/car', 'true')

     }
  if (forceState == 'true') {
    sensorCounter++;
    shower = true;
    console.log(sensorCounter)
    console.log('shower true')
  } else {
    shower = false;
    sensorCounter--;
    console.log(sensorCounter)
    console.log('shower false')
  }

  sensorCounterCheck();

}

function bedCheck (message) {

  forceState = message // Put Value into var: forceState

  if (connected && forceState == 'used') {
      // Say something?
      //  client.publish('comcar/car', 'true')

     }
  if (forceState == 'true') {
    sensorCounter++;
    bed = true;
    console.log(sensorCounter)
    console.log('bed true')
  } else {
    bed = false;
    sensorCounter--;
    console.log(sensorCounter)
    console.log('bed false')
  }

sensorCounterCheck();

}

/*function testCheck(message) {

  forceState = message // Put Value into var: forceState


  if (connected && forceState == 'used') {
      // Say something?
      //  client.publish('comcar/car', 'true')

     }
  if (forceState == 'true') {
    sensorCounter++;
    test = true;
    console.log(sensorCounter)
    console.log('test true')
  } else {
    sensorCounter--;
    test = false;
    console.log(sensorCounter)
    console.log('test false')
  }

sensorCounterCheck();

}*/

function drawerCheck (message) {

  forceState = message // Put Value into var: forceState


  if (connected && forceState == 'used') {
      // Say something?
      //  client.publish('comcar/car', 'true')

     }

  if (forceState == 'true') {
    sensorCounter++;
    drawer = true;
    console.log(sensorCounter)
    console.log('test true')
  } else {
    drawer = false;
    sensorCounter--;
    console.log(sensorCounter)
    console.log('test false')
  }

sensorCounterCheck();

}

function sensorCounterCheck() {
  if (sensorCounter == 1) {
    client.publish('comcar/car', 'count auf 1')
  } else if (sensorCounter == 2) {
    client.publish('comcar/car', 'count auf 2')
  }
  else if (sensorCounter == 3) {
    client.publish('comcar/car', 'count auf 3')
  }
  else if (sensorCounter == 4) {
    client.publish('comcar/car', 'count auf 4')
  }
  else if (sensorCounter == 5) {
    client.publish('comcar/car', 'count auf 5, auto kommt!')
  }
  /*switch (sensorCounter) {
    case sensorCounter <2 || sensorCounter > 5:
      break;
    case sensorCounter = 2:
       client.publish('comcar/car', 'count auf 2')
       break;
    case sensorCounter = 3:
      client.publish('comcar/car', 'count auf 3')
      break;
    case sensorCounter = 4:
      client.publish('comcar/car', 'count auf 4')
      break;
    case sensorCounter = 5:
      client.publish('comcar/car', 'count auf 5')
      break;*/
       
       
  }