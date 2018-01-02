const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var Axios = require('axios');
var customResponses = require('./responses');

const PORT = process.env.PORT || 3000;
const app_channel_ids = ['G5U4QADM5', 'D5ZRKBF0U', 'D1B41UMTP', 'D7XBVJ11S'];
const app_command = '/slacky';
const app_token = 'Laxhh7SiOEDj2UK049nShPLK';

// Responses that need special attention
const specialResponses = ["BITCOIN_LOOKUP", "LOVE_BACK"];

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
    if (app_channel_ids.indexOf(body.channel_id) === -1) {
        next("Slacky doesn't work here.");
        return;
    }
    
    // Otherwise, search for valid response
    var reqMessage = body.text.toLowerCase();
    var lowestSubstringIndex = Number.POSITIVE_INFINITY;
    var longestTriggerLength = Number.NEGATIVE_INFINITY;
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
            if (substringIndex < lowestSubstringIndex || (substringIndex === lowestSubstringIndex && triggerLength > longestTriggerLength)) {
                    
                lowestSubstringIndex = substringIndex;
                longestTriggerLength = triggerLength;
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
    
    if (specialResponses.indexOf(req.slackPost) !== -1) {
        return specialResponse(req, next);
    } else {
        next();
    }
}

// Must call next!
function specialResponse(req, next) {
    switch (req.slackPost) {
        case "BITCOIN_LOOKUP":
            return Axios.get("https://api.coindesk.com/v1/bpi/currentprice.json")
                .then(function(response) {
                    req.slackPost = "*1 BTC = " + response.data.bpi.USD.rate + " USD* as of " + response.data.time.updated;
                    next();
                })
        case "LOVE_BACK":
            req.slackPost = `I love you too, <@${req.body.user_id}>`;
            return next();
        default:
            return next();
    }
}

function confirmOK(req, res) {
    if (req.shouldPost) {
        console.log("Response:", req.slackPost);
        res.status(200).json({
            "response_type": "in_channel",
            "link_names": 1,
            "text": req.slackPost
        });
    } else {
        console.log("No response found.")
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