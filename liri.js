require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require('twitter');
//var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//var command = process.argv;
//var liriCommand = command[2];
//var liriArgument = command[3];

function getTweets() {
var Tparams = {
    screen_name: 'LiriTest7181',
    count: 20,
  }

// Twitter requests
client.get('statuses/user_timeline', Tparams , function (err, tweet, result) {
    if (err) {
        console.log(err);
    } else {
        for (var i = 0; i <tweet.length; i ++) {
            console.log("\n" + "Created: " + tweet[i].created_at + "\n" + "Brilliant Observation:  " + tweet[i].text);
            console.log("==============");
        }
    }
});
}

getTweets();