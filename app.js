const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const customResponses = require('./responses');
const { specialResponses, respondSpecially } = require('./specialResponses');

const PORT = process.env.PORT || 3000;
const app_channel_ids = ['G5U4QADM5', 'D5ZRKBF0U', 'D1B41UMTP', 'D7XBVJ11S'];
const app_command = '/slacky';
const app_token = 'Laxhh7SiOEDj2UK049nShPLK';

// Setup bodyparser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// NEXT STEPS:

function buildResponse(req, res, next) {
    console.log(req.body);
    let body = req.body;
    
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
    let reqMessage = body.text.toLowerCase();
    let lowestSubstringIndex = Number.POSITIVE_INFINITY;
    let longestTriggerLength = Number.NEGATIVE_INFINITY;
    let bestResponse;
    req.shouldPost = false;
    
    // Using the explicit for loops for performance, iterate through each trigger of each customResponse
    for (let i = 0; i < customResponses.length; i++) {
        let triggers = customResponses[i].triggers;
        
        for (let j = 0; j < triggers.length; j++) {
            let trigger = triggers[j];
            
            // If trigger not in message, continue to next trigger.
            let substringIndex = reqMessage.indexOf(trigger);
            if (substringIndex === -1) continue;
            
            let triggerLength = trigger.length;
            
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
        let validResponses = customResponses[bestResponse].responses;
        req.slackPost = validResponses[Math.floor(Math.random()*validResponses.length)];
    }
    
    if (specialResponses.keys.includes.indexOf(req.slackPost) !== -1) {
        return respondSpecially(req, reqMessage, next);
    } else {
        next();
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