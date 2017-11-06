// Custom responses for my semi-reincarnation of slacky.
// These will be triggered as "/slacky [trigger]"
// Please keep all triggers lowercase. Responses can be formatted as any string.

var custom_messages = [
   {
        triggers: ["ping"],
        responses: ["pong", ":ping-pong:"]
    },{
        triggers: ["4 lit"],
        responses: [":fire::fire::fire::fire:"]
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
        responses: ["never", "In 10 days", "in 2 hours", "tomorrow", "probably never", "give it ~4 days", "in three fortnights", "you will not be around, so why does it matter?"]
    }, {
        triggers: ["bee me"],
        responses: ["Ya like jazz?", "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible."]
    }, {
        triggers: ['tell me something funny'],
        responses: ['No', 'Did I ever tell you about the time I met Justin at REI?', "@here"]
    }, {
        triggers: ["who"],
        responses: [":dietrich:", ":kyle-w:", ":justin:", ":albert:", ":kyle-m:", ":natasha-k:", ":jake-b:", ":jake-m:", ":jake-b:", ":richard-w:", ":kevin-w:", ":kevin-z:", ":spinning-maurice:", "@john.b", "@flanders.l", "@trey.z", "@michelle.n"]
    }, {
        triggers: ["is", "are", "does", "do", "will", "should", "could", "am", "would", "did", "were"],
        responses: [":no_good: :no_entry_sign: no :no_good: :no_entry_sign:", ":the_horns::dancing-party: yes:the_horns::dancing-party:"]
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
        responses: [":panda-express:", ":saffron:", ":carls-jr:", ":taco-bell:", ":mcdonalds:", ":kfc:", ":wendys:", ":arbys:", ":soylent:", "grand central market", "mendocino", "Tarbooshla"]
    }, {
        triggers: ["really?"],
        responses: ["really.", "not really", "yes", "jk"]
    }, {
        triggers: ["ayy"],
        responses: ["lmao"]
    }, {
        triggers: ["tell me something sad"],
        responses: [":albert:"]
    }, {
        triggers: ["tell me something funny"],
        responses: ["ALRT #330696 on NR Vision Frontend: CRITICAL: 'author-1d' on 'vision-processor420.gus.taboolasyndication.com': Reply 114:Ack, 116:Resolv, 118:Escal8 (@albert.y)", "I guess he was just a bad conductor", '"Greed will imprison us all." -Albsy', "Have I told you the story of @justin.h apartment shopping?", "He who fights with monsters might take care lest he thereby become a monster. And if you gaze for long into an abyss, the abyss gazes also into you.", "You have your way. I have my way. As for the right way, the correct way, and the only way, it does not exist."]
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
        triggers: [],
        responses: []
    }
];

module.exports = custom_messages;
