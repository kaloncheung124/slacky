const moment = require('moment');
const {specialResponses} = require('./specialResponses.js');

// Custom responses for my semi-reincarnation of slacky.
// These will be triggered as "/slacky [trigger]"
// Please keep all triggers lowercase. Responses can be formatted as any string.

const custom_messages = [
  {
    triggers: ["ping"],
    responses: ["pong", ":ping-pong:"]
  }, {
    triggers: ["4 lit", "how lit is taboola", "how lit is :taboola:"],
    responses: [":fire::fire::fire::fire:"]
  }, {
    triggers: ["4 reba", "how reba is taboola", "how reba is :taboola:", "4 :reba:", "how :reba: is taboola", "how :reba: is :taboola:"],
    responses: [":reba::reba::reba::reba:"]
  }, {
    triggers: ["how lit"],
    responses: [":droplet:", ":fire:", ":fire::fire:", ":fire::fire::fire:", ":fire::fire::fire::fire:"]
  }, {
    triggers: ["frank ocean"],
    responses: ["No one cares, @dietrich.a"]
  }, {
    triggers: ["russian roulette"],
    responses: [":cloud::gun:", ":cloud::gun:", ":cloud::gun:", ":cloud::gun:", ":cloud::gun:", ":boom::gun:"]
  }, {
    triggers: ["yee haw"],
    responses: [":yee-haw-dietrich:", ":yeehaw:", "YEE HAW"]
  }, {
    triggers: ["when"],
    responses: ["never", "In 10 days", "in 2 hours", "tomorrow", "probably never", "give it ~4 days", "in three fortnights", "you will not be around, so why does it matter?", "in 5 minutes", "by the time the sun sets", "as soon as you grow up :information_desk_person:", "the night of your 18th birthday", "sooner than you could even know", "Are you pulling my leg? :eyes:"]
  }, {
    triggers: ["bee me"],
    responses: ["Ya like jazz?", "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible."]
  }, {
    triggers: ["who"],
    responses: [":justin:", ":albert:", ":jake-b:", ":jake-m:", ":kevin-z:", ":spinning-maurice:", ":john-b:", ":jordan-pina:", ":michelle:", ":kalon:", ":the-real-udaya:", ":gabe-l:", ":alex:", ":anton:", ":or:", ":mitch:", ":jarrod:", ":trash-cannor:", ":lawrence-l:", ":godwin:"]
  }, {
    triggers: ["is", "are", "does", "do", "will", "should", "could", "am", "would", "did", "were", "can"],
    responses: [
      ":no_good: :no_entry_sign: no :no_good: :no_entry_sign:",
      ":the_horns::dancing-party: yes:the_horns::dancing-party:",
      ":turning-maurice: non :turning-maurice:",
      ":bouncing-around-maurice: oui oui :bouncing-around-maurice:",
      ":wandering-albert: ah yes :wandering-albert:",
      ":ticking-albert: noot :ticking-albert:",
    ]
  }, {
    triggers: ["can you kindly", "will you kindly", "could you kindly", "would you kindly", "please"],
    responses: [":the_horns::dancing-party: yes:the_horns::dancing-party:"]
  }, {
    triggers: ['do you like'],
    responses: [':heart:', ':dislike:']
  }, {
    triggers: ['issa knife'],
    responses: [':knife:']
  }, {
    triggers: ["attack"],
    responses: [":rs-dmg-0:", ":rs-dmg-1:", ":rs-dmg-99:", ":rs-dmg-poison:", ":ms-dmg-0:", ":ms-dmg-1:", ":ms-dmg-99:", ":ms-dmg-69:", ":ms-dmg-420:", ":ms-dmg-99-heavy:", ":ms-dmg-666:", ":ms-dmg-miss:"]
  }, {
    triggers: ["help"],
    responses: ["the greatest help comes from within"]
  }, {
    triggers: ["where should we eat", "where should i eat", "what should i eat", "where do i eat"],
    responses: [":panda-express:", ":saffron:", ":carls-jr:", ":taco-bell:", ":mcdonalds:", ":kfc:", ":wendys:", ":arbys:", ":soylent:", "grand central market", "mendocino", "Tarbooshla", ":georges-greek-grill:"]
  }, {
    triggers: ["really?"],
    responses: ["really.", "not really", "yes", "jk"]
  }, {
    triggers: ["ayy"],
    responses: ["lmao"]
  }, {
    triggers: ["tell me something sad"],
    responses: ["Sprint celebration has been postponed to next tuesday", "moved Sprint celebration to thursday afternoon!", "due to today's production issues, sprint celebration is postponed to tuesday."]
  }, {
    triggers: ["tell me something funny"],
    responses: ["ALRT #330696 on NR Vision Frontend: CRITICAL: 'author-1d' on 'vision-processor420.gus.taboolasyndication.com': Reply 114:Ack, 116:Resolv, 118:Escal8 (<@U09318SQL>)", "I guess he was just a bad conductor", '"Greed will imprison us all." -Albsy', "Have I told you the story of @justin.h apartment shopping?", "He who fights with monsters might take care lest he thereby become a monster. And if you gaze for long into an abyss, the abyss gazes also into you.", "You have your way. I have my way. As for the right way, the correct way, and the only way, it does not exist.", "One must still have chaos in oneself to be able to give birth to a dancing star.", "That which does not kill us makes us stronger.", "So there’s this kid named Billy. And Billy’s a normal kid, right? Except he loves trolleys…"]
  }, {
    triggers: ["where is albsy", "where is :albert:", "where is albert"],
    responses: [":alpsy:: wuddup"]
  }, {
    triggers: ["/delet"],
    responses: ["`$ rm -rf /`"]
  }, {
    triggers: ["supreme"],
    responses: [":sup-1::sup-2::sup-3:"]
  }, {
    triggers: ["worldwide"],
    responses: [":pitbull::earth_americas::earth_africa::earth_asia::pitbull_dale:"]
  }, {
    triggers: ["i hate"],
    responses: ["Play nice kids!", "_whips out camera_ *FIGHT FIGHT FIGHT*", "be a lover, not a hater", "No fightin' (SHAKIRA SHAKIRA)", "Why?", "lol me too", "l8r h8r", "More than Garfield hates Mondays?"]
  }, {
    triggers: ["pokemon", "a wild pokemon appeared", "tall grass"],
    responses: [":pokemon-abra:", ":pokemon-alakazam:", ":pokemon-alomomola:", ":pokemon-ampharos:", ":pokemon-articuno:", ":pokemon-banette:", ":pokemon-bayleef:", ":pokemon-bibarel:", ":pokemon-bidoof:", ":pokemon-blaziken:", ":pokemon-bronzong:", ":pokemon-bulbasaur:", ":pokemon-burmy:", ":pokemon-butterfree:", ":pokemon-camerupt:", ":pokemon-chansey:", ":pokemon-charizard:", ":pokemon-charmander:", ":pokemon-charmeleon:", ":pokemon-chikorita:", ":pokemon-chimchar:", ":pokemon-chimecho:", ":pokemon-chinchou:", ":pokemon-chingling:", ":pokemon-combusken:", ":pokemon-comfey:", ":pokemon-corsola:", ":pokemon-cosmoem:", ":pokemon-cryogonal:", ":pokemon-cubchoo:", ":pokemon-cubone:", ":pokemon-cutiefly:", ":pokemon-cyndaquil:", ":pokemon-darkrai:", ":pokemon-delibird:", ":pokemon-dialga:", ":pokemon-diggersby:", ":pokemon-ditto:", ":pokemon-dragonair:", ":pokemon-dugtrio:", ":pokemon-dugtrio-alolan-form:", ":pokemon-durant:", ":pokemon-dusclops:", ":pokemon-duskull:", ":pokemon-eevee:", ":pokemon-ekans:", ":pokemon-entei:", ":pokemon-escavalier:", ":pokemon-exeggcute:", ":pokemon-farfetch'd:", ":pokemon-flaaffy:", ":pokemon-flabébé:", ":pokemon-furfrou:", ":pokemon-furret:", ":pokemon-gastly:", ":pokemon-gengar:", ":pokemon-geodude:", ":pokemon-girafarig:", ":pokemon-gogoat:", ":pokemon-golem:", ":pokemon-gourgeist:", ":pokemon-gumshoos:", ":pokemon-gyarados:", ":pokemon-haunter:", ":pokemon-heatmor:", ":pokemon-heracross:", ":pokemon-ho-oh:", ":pokemon-hypno:", ":pokemon-ivysaur:", ":pokemon-jangmo-o:", ":pokemon-joltik:", ":pokemon-jigglypuff:", ":pokemon-klinklang:", ":pokemon-koffing:", ":pokemon-kyogre:", ":pokemon-lapras:", ":pokemon-linoone:", ":pokemon-litten:", ":pokemon-litwick:", ":pokemon-lotad:", ":pokemon-lugia:", ":pokemon-lunala:", ":pokemon-luvdisc:", ":pokemon-luxray:", ":pokemon-machoke:", ":pokemon-magikarp:", ":pokemon-mantyke:", ":pokemon-mareep:", ":pokemon-marshadow:", ":pokemon-marshtomp:", ":pokemon-meloetta:", ":pokemon-meowth:", ":pokemon-mew:", ":pokemon-mewtwo:", ":pokemon-miltank:", ":pokemon-mimikyu:", ":pokemon-minior:", ":pokemon-misdreavus:", ":pokemon-moltres:", ":pokemon-mudbray:", ":pokemon-mudkip:", ":pokemon-munchlax:", ":pokemon-nidoking:", ":pokemon-nidoqueen:", ":pokemon-numel:", ":pokemon-pachirisu:", ":pokemon-pancham:", ":pokemon-parasect:", ":pokemon-phanpy:", ":pokemon-pidgey:", ":pokemon-pikachu:", ":pokemon-poliwhirl:", ":pokemon-popplio:", ":pokemon-porygon:", ":pokemon-porygon2:", ":pokemon-psyduck:", ":pokemon-pumpkaboo:", ":pokemon-purrloin:", ":pokemon-quilava:", ":pokemon-raichu:", ":pokemon-raikou:", ":pokemon-raticate:", ":pokemon-raticate-alolan-form:", ":pokemon-rayquaza:", ":pokemon-red-gyarados:", ":pokemon-regigigas:", ":pokemon-rhyhorn:", ":pokemon-roggenrola:", ":pokemon-rowlet:", ":pokemon-sableye:", ":pokemon-salamence:", ":pokemon-samurott:", ":pokemon-shiny-shuppet:", ":pokemon-skitty:", ":pokemon-slaking:", ":pokemon-slowpoke:", ":pokemon-slurpuff:", ":pokemon-smoochum:", ":pokemon-snorlax:", ":pokemon-snover:", ":pokemon-solgaleo:", ":pokemon-spinda:", ":pokemon-spiritomb:", ":pokemon-squirtle:", ":pokemon-starly:", ":pokemon-steelix:", ":pokemon-stunky:", ":pokemon-suicune:", ":pokemon-sunkern:", ":pokemon-swampert:", ":pokemon-tentacool:", ":pokemon-thundurus:", ":pokemon-togepi:", ":pokemon-togetic:", ":pokemon-torchic:", ":pokemon-treecko:", ":pokemon-trubbish:", ":pokemon-umbreon:", ":pokemon-vanillite:", ":pokemon-vaporeon:", ":pokemon-vespiquen:", ":pokemon-victini:", ":pokemon-wailord:", ":pokemon-watchog:", ":pokemon-wingull:", ":pokemon-wishiwashi:", ":pokemon-wooper:", ":pokemon-wynaut:", ":pokemon-zapdos:", ":pokemon-wooloo:"]
  }, {
    triggers: ["pokeball", "catch"],
    responses: ["*wobble* *wobble* *wobble* Shoot! it was so close too!", "*wobble* Aww, it appeared to be caught!", "*wobble* Darn! The Pokemon broke free!", "Oh no! The pokemon broke free!", "*wobble* *wobble* *wobble* *click* Gotcha, pokemon was caught!", "*wobble* *wobble* Aargh! Almost had it!"]
  }, {
    triggers: ["run away", "escape"],
    responses: [":runner: Got away safely! :runner:", ":runner: Got away safely! :runner:", ":runner: Got away safely! :runner:", ":x: Can't escape! :x:"]
  }, {
    triggers: ["turnaround", "turn around"],
    responses: ["every now and then I get a little bit lonely and you're never coming round", "every now and then I get a little bit tired of listening to the sound of my tears", "every now and then I get a little bit nervous that the best of all the years have gone by", "every now and then I get a little bit terrified and then I see the look in your eyes", "but every now and then I fall apart", "every now and then I fall apart", "BRIGHT EYES", "bright eyes"]
  }, {
    triggers: ["annoying"],
    responses: ["<!here>"]
  }, {
    triggers: ["five more minutes", "5 more minutes", "five-more-minutes"],
    responses: ["The egg cannot sleep\nThe egg must wake up\nThe egg must work\nTurn around, look in the mirror\nYou are the egg\nEND SCENE"]
  }, {
    triggers: ["dietrich"],
    responses: ["The egg cannot sleep\nThe egg must wake up\nThe egg must work\nTurn around, look in the mirror\nYou are the egg\nEND SCENE", "~~~~~~~~~~~~~~~~~~~~:>-\nlook its a fucking snake\nLMAO", "oh okay so a really quick summary of that story i was going to tell\nthese kids got this other kid's backback opened it, got the binder from inside, opened the binder, placed an old looking banana inside the binder, closed the binder, put it in the backpack, and then smashed the backpack a little, all this happened as lunch was ending", "Who needs people when you have trees", "I dont know what boelter is\nbut it is not a good place", "its just a joke\ni love all of you ucla people\neven richard, who bring me beans", "~~~~:>-\nLook its a tiny ole snake\nLMAO", "wasnt the original name pashoon", "Oh so I was in westwood village the other day\nmy buddio said come down\nand he said hed buy me any coffee I wanted\nSo I was excited\nI went down to westwood village\nand the parking was $450\nunbelievable\nYeah I know\ndoes no one think this joke is funny\nWhens the last time you paid $450 for parking", "This one time in high school my buddio invited over to his house\nthis was back when we used to play a lot of video games\nbut he just got into Metal Gear Solid\nwhich is a single player game\nso instead of us hangning out\nI got to sit down and watch him play this game by himself\nEverytime I asked if I could play he told me to fuck off\nTHat day was pretty dull\nbut hey you know theres a silver lining to every story\nat least the parking wasnt $450", "You know\nI told a real story once\nit was about bananas\nand yall said nothing\nso now I tell these stories", "<@U1LNHR71U> just a reminder\ndont forget the beans\nthis is mom call me, bye", "one time my buddio did something simlar\nthe same one who made me watch him play mgs\nhe was playing some COD and got mad at getting klled so much. He threw his controller at the ground it bounced off his carpet and hit and cracked his TV", "damn you havea  brother\nSee as an only child\nI cant say I have memories like that\ninstead I can tell you how teenage angst got the best of one of my friends during halloween horror nights\nand he pushed this girl\noh theres more stuff that happened beforehand\nthat was like the end part\nGood ole horror nights\nsuch memories", "i want hasbrowns yo", "ay\n<@U1LNHR71U>\ndid i ever tell yeah the story of how I almost won the lottery\nokay to tell this story\nill do something a little different\nill type everything with my eyes closed\nokay so the lottery story\nlemme tell yeah boi\nso i believe the age you can start buying lottery tickets is is 18\nso I went and bought a lottery ticket for mt 18th birthday as one does when celebrating a new age\nso I bought a ticket\nnow I havent purchsed one since then\nso im unsure of the rules on how to win right now at two in the morning\nbut all i remember was\ni was two numbers away from winning a small amouint\nand thats my story", "i would be a great villain\ni would charge $450 for parking", "oh man\ni am thoroughly excited\nwhats that I see?\nCould it be?\nOh yes!\nIts the goodnight tree!\n:christmas_tree:", "I want to make this known\nBoba\ncan we get boba to celebrate friday", "I feel like <@U1LNHR71U> only tolerates me", "I like haikus", "my name is 2 syllables you legume", "_the hostility_\n_I can feel it in the air_\n_it ruins my day_", "does it tell the story about how Richard Wen invited me to seattle for free beans\nbut when I got there\nthe parking was $450", "I yam willing to switch to another messenger\nFb is trash\nUse Allo :D", "i would take mad dabs bruv", "Life\nWhat does it mean to be alive\nOr better yet\nwhat does it mean\nto be\na life", "Heres a joke to brighten everyones day\nDid you know Bruce Lee had a vegetarian brother?\nYeah, Brocco Lee wasn't as popular as him", "Justin you are like a large piece of paper\nYou're incredibly useful\nFor some people", "I'm hungry\nDid you have taco night without me\n", "Are there 24 hour Indian buffets\nOr Thai places\nGoogle says no\nSad", "I sat on my laptop once\nthe screen broke\n$30 to replace it\nit was a chromebook\npraise be", "<@U1LNHR71U> can I give to your for christmas\n https://letscoal.com/products/the-franklin\n Itll keep you warm", "Oh everyone go outside and fill a plastic bag with air\nthen you can sell it\n\"Bag of LA air during fire\"\n$400", "My buddy just texted me\nHe asked me if I'm good\nI said I'm great\nWait hold up sorry let me start over\nMy buddy texted me\nHe said \"what's up fam hope you good\"\nI said, \"I'm good I'm great\"\nAnd then next text he ask me for something\nReal friends", "Saying you in a group is strange\nWho am I addressing you know\nLol you already know family\nPlease laugh", "So I got a call today\nFrom this person asking me, a home owner, if I wanted to put solar panels on my home\nFirst off I'm not a home owner\nBut they called me buddy a lot", "Wow\nme in the future\nimagine that\n\"Howdy, may I take your order\"", "Anyone wanna hear a bread joke\n:bread:\nHahah", "So when Awaken My Love came out I didn't really vibe with it\nI liked redbone and me and your mama or whatever that first song is called\nThe two singles that he released before the album\nI stopped listening to the album almost immediately\nNow fast forward to 2018 and for some reason I started listening to it.\nI love it\nBut when it came out\nit wasn't the right time for me to fall in love with it\nI hope the same will happen to you richard\nMaybe one day when you are driving up to Redmond\nYou put on Awaken my love\nRoll your window down\nand drive the legal speed limit\nWishing you godspeed Richard", "You ever drive without shoes\nTerrible feeling\nwould not recommend\nYour foot gets all dirty from the dirt from the pedal since you typically use shoes", "I feel bad for Trump\nhe is so smart\nhe is wasting his time being a politician\nhe should have been a scientist of some sorts\nHe has great ideas", "now reddit is built with react\nthis is the future", "i always have lean\nits how i stay relaxed\n25 a sip", "lol\n<@U1LNHR71U>\nreal talk\nI'm trying to increase my swag\ndo you think people will notice me\nif I wear these shoes\nhttps://www.gucci.com/us/en/pr/men/mens-shoes/mens-sneakers/ace-sneaker-p-473762A9L601066?position=69&listName=M_Shoes_US&categoryPath=Men/Mens-Shoes/Mens-Sneakers", "_tips fedora_", "I hate this chat", "Im going to runaway\nLive in a cabin\nplay my guitar\nand trumpet\nand record an album\nabout how i hate my life", "Why is everyones name misspelled", "Hey I hope everyone is having a great life\nremember to love yourself\nYou can't love other people until you love yourself\nYou are an amazing person\nNo one has lived your life\nand thats what makes you unique\nStay positive", "WANNA MAKE MONEY?\nSTART SELLING CHIPS TO MIDDLE SCHOOLERS\n$1 CHIPS\n500 PEOPLE\n$500 REAL FAST\nBETTER YET\nGO TO DOWNTOWN LA\nCALIFORNIA PLAZA 2\nSELL PLUSH ANIMALS\nTHERES A COMPANY THAT WILL BUY THEM RIGHT UP\nMARK THEM UP 300%\n€¥¢£", "KEVINNNNN\nKEYVON\nI KNEW A GUY NAMED KEYVON\nTHAT GUY WAS A REAL JERK", "Okay here I've got a good joke\nA guy walks into a bar\ngoes up to the bartender and says\nwhats a guy gotta do to get a free drink around here\nthe bartender says to him\nTell me a recursive joke\nSo guy tells him\nSo a guy walks into a bar\nand says to the bartender\nwhat does a guy gotta do to get a free drink around here\nand the bartender says\ntell me a recursive joke\nIm too lazy to keep telling the joke\nso just know the guy gets his free drink\nthank you", "Its been 105 days\nnobody has received their frank cds", "Well you know Richard\nI've got this buddy from Washington state\nHes a real sour guy\nYou might get along with him", "Okay so help me work on this bit\nYou start off with saying\nWell actually before that\nYou would use this bit if youre talking to somebody\nit works in a solo conversation or group setting\nman I had the right wording the opener a second ago\nhold on\nokay heres a rough version of it\nyou say something like, \"i've been trying to be a better person lately and I've heard bringing up things from previous conversations makes you seem more genuine\"\nthen a little pause so the person understands the context\nthen you say, \"so ___ hows your dad\"\nthen hopefully theyll say something like\n\"my dad?\"\nthen you say, \"yeah I remember one time you mentioned you had a dad\"\nbut lets say they dont say, \"my dad?\"\nthen you can just say, \"oh I ask because I remember you mentioned you had a dad\"\nworks either way", "I just want you all to know\nThis is the bird emoji for whatsapp\n:whatsapp-bird:\nSo I think its safe to say whatsapp is the best messenger out there", "olllllllllllllllllllllllllllllllllllly6777\nMy cat typed that\nI sent it because I thought you would enjoy it\nHey you know I wanna get something off my chest\nI love all of you\nYou're all great people\nI really use this chat to get rid of a lot my stress\nWithout this chat I would have to let out stress through other means\nbut you guys keep me sane\nEven if it seems like the opposite is true\n\nSo thank you\nI'm not finished\nI really want to thank you taboola for letting me all of you\nLetting me meet*\nI really appreciate all of you\nI know a lot of you probably just tolerate me\nBut thank you for just letting me be myself\nIt's strange because you never know how long someone will stay in your life\nI'm happy I've gotten to know a lot of you for such a long time\nThank you\nOne day no one will talk in this chat"]
  }, {
    triggers: ["what time is it"],
    responses: [moment().utcOffset(-8).format("h:mm a")]
  }, {
    triggers: ["today's date", "what's the date"],
    responses: [moment().utcOffset(-8).format("dddd, MMMM Do, YYYY")]
  }, {
    triggers: ["btc", "bitcoin"],
    responses: [specialResponses.BITCOIN_LOOKUP]
  }, {
    triggers: ["oprah"],
    responses: ["You get to know who you really are in a crisis", "Your true passion should feel like breathing; its that natural", "I believe that every single event in life happens in an opportunity to choose love over fear.", "When you undervalue what you do, the world will undervalue who you are.", "Think like a queen. A queen if not afraid to fail. Failure is another stepping stone to greatness", "Turn your wounds into wisdom.", "You can have it all. Just not all at once.", "Be thankful for what you have; you'll end up having more. If you concentrate on what you don't have, you will never, ever have enough", "If a man wants you, nothing can keep him away. If he doesn't want you, nothing can make him stay.", "True forgiveness is when you can say, \"Thank you for that experience.\""]
  }, {
    triggers: ["cat massage", "cat-massage"],
    responses: [":tiger::wave::cat-massage: ", ":pouting_cat::wave::cat-massage: ", "https://www.youtube.com/watch?v=TnZhi5gaX8g", "Champion! It’s time for cat massage :cat-massage:", "Petting is just randomly petting", "Most people will go mid back. AH-!", "If we understood fluent meow, our cats would tell us that petting is passé because your cat wants a massage", "No oils or lotions are needed", "Cat massage even helps some cats tolerate a bath, but I don’t think we’ll be showing that", "Hey Champ, now that we’ve told our friends about the benefits of cat massage, let’s show them how to do it", "If you’re right handed, use your right hand; left-hander’s use left; OR if you’re right handed, try using your left and vice versa :cat-massage:", "Good for you, use two hands to double your pleasure and double your fun", "ACCEPT ME", "Relax, you have the best teacher available: your cat", "Remember the old Simon and Garfunkel song? ':musical_note:Slow down, you’re moving too fast:music:' ", "That says a lot about life and about cat massage :cat-massage:", "What may seem excruciatingly slow to us is so appropriate to your feline", "We touch all the time, so why not be the best at it?", "Like the touch of a fairy", "Caution! If your kitty doesn’t like her fur disturbed, she may tell you to shuffle out of the door.", "Caution! Either they like this or they don’t", ":warning: Caution! This is tender territory :warning:", ":warning: A whisker watch alert is in effect here! :warning:", "Remember, :rotating_light::warning: a MAJOR whisker watch alert is in effect here! :rotating_light::warning:", "Is your cat a talker? If so, cat massage will bring out his best mega-meow moments", "We call it 'power purring'! ", "Drooling! In this case, a drooler is not a person specialized in rings and watches. It’s a cat who’s so wrapped up and enjoying a massage that she forgets to swallow and then she drools", "Remember, you can’t fool drool!", "MMMmmmmmmm:cat-massage:", "The front of your cat is a veritable treasure chest of fun", "You don’t need a swimming pool for this breast stroking", "This is especially good for macho cats", "These are the prominent chest muscles seen on proud bodybuilders", "This is a really groovy move", "Belly-rama!", "Right out to the chinny chin chin", "A cat’s tail is its badge of honor, so let’s not neglect it", "Simply start from the base of the rump, rubbing your way out and follow it to its natural conclusion", ":musical_note:Who is the best cat in the United States:music: ??? It’s you Champ-er damper, it’s you!!", "BORING!", "Now: when to cat massage??? … Whenever!", "But it’s only a matter of time before your cat starts wanting cat massage, then starts demanding cat massage, cat massage, cat massage, cat massage",]
  }, {
    triggers: ["i love you"],
    responses: [specialResponses.LOVE_BACK]
  }, {
    triggers: ["issa dietrich"],
    responses: [":dietrich:", ":yee-haw-dietrich:"]
  }, {
    triggers: ["circle_text"],
    responses: [specialResponses.CIRCLE_TEXT]
  }, {
    triggers: ["_text"],
    responses: [specialResponses.TEXT]
  }, {
    triggers: ["is it snack time", "snack time"],
    responses: ["It is snack time my dudes."]
  }, {
    triggers: ["coin toss"],
    responses: ["heads", "tails"]
  }, {
    triggers: ["hi", "hello", "hey"],
    responses: ["hello there!", "hi", "hey"]
  }, {
    triggers: ["hello there"],
    responses: ["General Kenobi"]
  }, {
    triggers: ["what is the meaning of life", "meaning of life"],
    responses: ["According to Wikipedia: The meaning of life, or the answer to the question: \"What is the meaning of life?\", pertains to the significance of living or existence in general. Many other related questions include: \"Why are we here?\", \"What is life all about?\", or \"What is the purpose of existence?\" There have been a large number of proposed answers to these questions from many different cultural and ideological backgrounds. The search for life's meaning has produced much philosophical, scientific, theological, and metaphysical speculation throughout history. Different people and cultures believe different things for the answer to this question."]
  }, {
    triggers: ["what"],
    responses: [specialResponses.WHAT_IS]
  }, {
    triggers: ["poll"],
    responses: [specialResponses.POLL]
  }, {
    triggers: ["albert", ":albert:", "albsy"],
    responses: [":wandering-albert: ah yes :wandering-albert:", ":wandering-albert: I agree :wandering-albert:", ":really-makes-you-think-albert: I see :albert-think-you-makes-really:", ":bouncing-around-albert: excellent :bouncing-around-albert:"]
  },
];

module.exports = custom_messages;


