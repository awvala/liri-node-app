//require("dotenv").config();

var keys = require("./keys.js");
var twitter = require('twitter');
//var spotify = new Spotify(keys.spotify);
var client = new twitter(keys.twitter);

var command = process.argv;
var liriCommand = command[2];
var liriArgument = command[3];

function getTweets() {
var Tparams = {
    screen_name: 'LiriTest718',
    count: 20,
  }

// Twitter requests
client.get('statuses/user_timeline', Tparams , function (err, tweet, result) {
    if (err) {
        console.log(err);
    } else {
        for (var i = 0; i <tweets.length; i ++) {
            console.log("Created: " + tweet[i].created_at + "\n" + "Brilliant Observation:  " + tweet[i].text + "\n");
            console.log("==============");
        }
    }
});
}

getTweets();


