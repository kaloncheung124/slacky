const Axios = require('axios');

const specialResponses = {
    BITCOIN_LOOKUP: "SP_BITCOIN_LOOKUP",
    LOVE_BACK: "SP_LOVE_BACK",
    CIRCLE_TEXT: "SP_CIRCLE_TEXT",
}

module.exports.specialResponses = specialResponses;

// Must call next!
module.exports.respondSpecially = function(req, reqMessage, next) {
    switch (req.slackPost) {
        case specialResponses.BITCOIN_LOOKUP:
            return Axios.get("https://api.coindesk.com/v1/bpi/currentprice.json")
                .then(function(response) {
                    req.slackPost = "*1 BTC = " + response.data.bpi.USD.rate + " USD* as of " + response.data.time.updated;
                    next();
                })
        case specialResponses.LOVE_BACK:
            req.slackPost = `I love you too, <@${req.body.user_id}>`;
            return next();
            
        case specialResponses.CIRCLE_TEXT:
            // ASSUMES the text starts after the first word
            let textToCirclify = reqMessage.substr(reqMessage.indexOf(" ") + 1);
            req.slackPost = textIntoCircles(textToCirclify)
            return next();
        default:
            return next();
    }
}

const letterMap = {
    a: "atrain",
    b: "btrain",
    c: "ctrain",
    d: "dtrain",
    e: "etrain",
    f: "ftrain",
    g: "gtrain",
    h: "htrain",
    i: "i",
    j: "jtrain",
    k: "ktrain",
    l: "ltrain",
    m: "mtrain",
    n: "ntrain",
    o: "target",
    p: "ptrain",
    q: "qtrain",
    r: "rtrain",
    s: "strain",
    t: "ttrain",
    u: "utrain",
    v: "vtrain",
    w: "wtrain",
    x: "xcircle",
    y: "y",
    z: "ztrain",
    "?": "question",
    "1": "1train",
    "2": "2train",
    "3": "3train",
    "4": "4train",
    "5": "5train",
    "6": "6train",
    "9": "9train"
};

function textIntoCircles(str) {
    let output = "";
    for (let char of str) {
        let iconName = letterMap[char.toLowerCase()];
        let iconText = iconName ? `:${iconName}:` : char;
        output += char === " " ? "  " : (iconName ? `:${iconName}:` : char);
    }

    return output;
}