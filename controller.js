//
var express = require('express');
var app = express();
var path    = require("path");

//MQTT
const mqtt = require('mqtt')

app.get('/', function (req, res) {
  // res.send('Hello World!');
  res.sendFile(path.join(__dirname, '/', 'index.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

// controller.js

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

function openGarageDoor () {
  // can only open door if we're connected to mqtt and door isn't already open
  if (connected && garageState !== 'open') {
    // Ask the door to open
    client.publish('garage/open', 'true')
     testvariable = 'testvariable 2'

  }
}

function closeGarageDoor () {
  // can only close door if we're connected to mqtt and door isn't already closed
  if (connected && garageState !== 'closed') {
    // Ask the door to close
    client.publish('garage/close', 'true')
    testvariable = 'testvariable 3'
  }
}

// --- For Demo Purposes Only ----//

// simulate opening garage door
setTimeout(() => {
  console.log('open door')
  openGarageDoor()
}, 5000)

// simulate closing garage door
setTimeout(() => {
  console.log('close door')
  closeGarageDoor()
}, 80000)
