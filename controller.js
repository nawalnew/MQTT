// load the things we need
var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

var temp = 50;  //here you assign temp variable with needed value
// index page
app.get('/', function(req, res) {

    var total = temp+10;
    res.render('pages/index', { //render the index.ejs
    temp: temp,
    total:total,
    opened:opened
  });
});

app.listen(8080);
console.log('8080 for the win');

/* GET home page. */
// router.get('/', function(req, res, next) { // route for '/'
//   var temp = 50;  //here you assign temp variable with needed value
//   var total = temp+10;
//   res.render('index', { //render the index.ejs
//     temp: temp,
//     total:total
//   });
// });
//
// var server = app.listen(3000, function() {
//   var host = server.address().address;
//   var port = server.address().port;
//
//   console.log('Example app listening at http://%s:%s', host, port);
// });


// controller.js
//MQTT
const mqtt = require('mqtt')

const client = mqtt.connect('mqtt://broker.hivemq.com')

var garageState = ''
var connected = true
var testvariable = 'testvariable 1'

client.on('connect', () => {
  client.subscribe('garage/connected')
  client.subscribe('garage/state')

})

client.on('message', (topic, message) => {
  switch (topic) {
    case 'garage/connected':
      return handleGarageConnected(message)
    case 'garage/state':
      return handleGarageState(message)
  }
  console.log('No handler for topic %s', topic)
})

function handleGarageConnected (message) {
  console.log('garage connected status %s', message)
  connected = (message.toString() === 'true')

}

function handleGarageState (message) {
  garageState = message
  console.log('garage state update to %s', message)
}

var opened = 1;

function openGarageDoor () {
  // can only open door if we're connected to mqtt and door isn't already open
  if (connected && garageState !== 'open') {
    // Ask the door to open
    client.publish('garage/open', 'true')

    opened = + 5;

  }
}

function closeGarageDoor () {
  // can only close door if we're connected to mqtt and door isn't already closed
  if (connected && garageState !== 'closed') {
    // Ask the door to close
    client.publish('garage/close', 'true')

    opened = + 10;
  }
}

// --- For Demo Purposes Only ----//

// simulate opening garage door
setTimeout(() => {
  console.log('open door')
  openGarageDoor()
}, 2000)

// simulate closing garage door
setTimeout(() => {
  console.log('close door')
  closeGarageDoor()
}, 4000)
