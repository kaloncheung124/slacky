const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var Axios = require('axios');
var customResponses = require('./responses');

const PORT = process.env.PORT || 3000;
const app_channel_id = 'G5U4QADM5';
const app_command = '/slacky';
const app_token = 'Laxhh7SiOEDj2UK049nShPLK';

// Setup bodyparser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// NEXT STEPS:

function buildResponse(req, res, next) {
    console.log(req.body);
    var body = req.body;
    
    // Ensure correct command and slack team invoked this.
    if (body.command !== app_command || body.token !== app_token) {
        next("Incorrect command or team.")
        return;
    }
    
    // If it's not in the correct channel, don't reply
    if (body.channel_id !== app_channel_id) {
        next("Slacky doesn't work on this channel.");
        return;
    }
    
    // Otherwise, search for valid response
    var reqMessage = body.text.toLowerCase();
    var lowestSubstringIndex = Number.POSITIVE_INFINITY;
    var longestTrigerLenth = Number.NEGATIVE_INFINITY;
    var bestResponse;
    req.shouldPost = false;
    

    
    // Using the explicit for loops for performance, iterate through each trigger of each customResponse
    for (var i = 0; i < customResponses.length; i++) {
        var triggers = customResponses[i].triggers;
        
        for (var j = 0; j < triggers.length; j++) {
            var trigger = triggers[j];
            
            // If trigger not in message, continue to next trigger.
            var substringIndex = reqMessage.indexOf(trigger);
            if (substringIndex === -1) continue;
            
            var triggerLength = trigger.length;
            
            // If this trigger's index is lower, or it's the same and the trigger string length is greater, choose this response index.
            if (substringIndex < lowestSubstringIndex || (substringIndex === lowestSubStringIndex && triggerLength > longestTrigerLength)) {
                    
                lowestSubstringIndex = substringIndex;
                longestTriggerLenth = triggerLength;
                bestResponse = i;
                req.shouldPost = true;
            }
        }
    }
    
    // If valid response, pick a random response
    if (req.shouldPost) {
        var validResponses = customResponses[bestResponse].responses;
        req.slackPost = validResponses[Math.floor(Math.random()*validResponses.length)];
    }
    next();
}

function confirmOK(req, res) {
    if (req.shouldPost) {
        res.status(200).json({
            "response_type": "in_channel",
            "text": req.slackPost
        });
    } else {
        res.status(200).send("No :fire: response found.");
    }
}

function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(200).send(err);
}

app.post('/slacky',
    buildResponse,
    confirmOK,
    errorHandler
)

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
})

app.listen(PORT, function() {
  console.log('Slacky reporting for duty on port', PORT );
})