const Axios = require('axios');
const splitString = require("split-string");

const specialResponses = {
  BITCOIN_LOOKUP: "SP_BITCOIN_LOOKUP",
  LOVE_BACK: "SP_LOVE_BACK",
  CIRCLE_TEXT: "SP_CIRCLE_TEXT",
  TEXT: "SP_TEXT",
  WHAT_IS: "WHAT_IS",
  POLL: "POLL",
};

module.exports.specialResponses = specialResponses;

// Must call next!
module.exports.respondSpecially = function(req, reqMessage, next) {
  let firstSpaceIndex = reqMessage.indexOf(" ");
  let textAfterFirstWord = firstSpaceIndex === -1 ?
    '' :
    reqMessage.substr(firstSpaceIndex + 1);

  switch (req.slackPost) {
    case specialResponses.BITCOIN_LOOKUP:
      return Axios.get("https://api.coindesk.com/v1/bpi/currentprice.json")
        .then(function(response) {
          req.slackPost = "*1 BTC = " + response.data.bpi.USD.rate + " USD* as of " + response.data.time.updated;
          next();
        });
    case specialResponses.LOVE_BACK:
      req.slackPost = `I love you too, <@${req.body.user_id}>`;
      return next();

    case specialResponses.CIRCLE_TEXT:
      // ASSUMES the text starts after the first word
      req.slackPost = textIntoCircles(textAfterFirstWord);
      return next();

    case specialResponses.TEXT:
      // ASSUMES the text starts after the first word
      req.slackPost = textToEmoji(textAfterFirstWord);
      return next();
    case specialResponses.WHAT_IS:
      // Assumes the message starts after
      let textToSearch = encodeURIComponent(reqMessage.toLowerCase());
      req.slackPost = `https://www.google.com/search?q=${textToSearch}`;
      return next();
    case specialResponses.POLL:
      return generatePoll(textAfterFirstWord, req, next);
    default:
      return next();
  }
};

const englishTextRegex = /^[a-z]$/i;
function getTextIconString(char) {
  // If it's a space, double it to space out the big words.
  if (char === " ")
    return "  ";

  let validChar = englishTextRegex.test(char);
  return validChar ? `:${char.toLowerCase()}-lowercase:` : char;
}

function textToEmoji(text) {
  let output = "";
  for (let char of text) {
    output += getTextIconString(char);
  }

  return output;
}

function splitArguments(string) {
  const keep = a => a !== '"' && a !== "'";
  const options = {separator: ' ', quotes: ['"', '\''], keep};
  return splitString(string, options);
}

function generatePoll(textAfterFirstWord, req, next) {
  let arguments = splitArguments(textAfterFirstWord);
  if (arguments.length <= 1) {
    return next("Please include a title and at least one option")
  } else if (arguments.length > 11) {
    return next("Yeah sorry I'm not sure which emojis to use after :keycap_ten:")
  }

  const title = `*${arguments.shift()}*`;
  const processedArguments = arguments.map((option, index) => {
    const optionNumber = index + 1;
    const emojiName = numberMap[optionNumber];
    const emoji = emojiName ? `:${emojiName}:` : `*${optionNumber}*:`;

    return `${emoji} ${option}`;
  });

  const lineArray = [title, ...processedArguments];
  req.slackPost = lineArray.join('\n\n');
  return next();
}

const numberMap = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "keycap_ten"
};

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
  "0": "0train",
  "1": "1train",
  "2": "2train",
  "3": "3train",
  "4": "4train",
  "5": "5train",
  "6": "6train",
  "7": "7train",
  "8": "8train",
  "9": "9train"
};

function textIntoCircles(str) {
  let output = "";
  for (let char of str) {
    let iconName = letterMap[char.toLowerCase()];
    let iconText = iconName ? `:${iconName}:` : char;
    output += char === " " ? "  " : iconText;
  }

  return output;
}