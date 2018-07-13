// Require the following NPM modules
require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// Global Variables
var command = process.argv;
var liriCommand = command[2];
var liriArgument = command[3];

// Node functions
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
                console.log("\n" + "Created: " + tweet[i].created_at + "\n" + "Brilliant Observation:  " + tweet[i].text + "\n");
                console.log("==============");
            }
        }
    });
}

// Spotify requests
function getMusic() {
    var songTitle = process.argv[3];
    console.log()
    if (!songTitle) {
        songTitle = "The Sign";
    }
        console.log(songTitle);
        spotify.search({type: 'track', query: songTitle}, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            } else {
                var spotifyData = data.tracks.items;
                for (var i = 0; i < spotifyData.length; i ++) {
                    console.log("\n" + "Artist: " + spotifyData[i].artists[0].name);
                    console.log("Song: " + spotifyData[i].name);
                    console.log("Preview URL: " + spotifyData[i].preview_url);
                    console.log("Album: " + spotifyData[i].album.name);
                    console.log("==============");
                }
            }  
        })
    };

// Determine which function to run
switch (liriCommand) {
    case "my-tweets":
        getTweets();
        break;
    case "spotify-this-song":
        getMusic();
        console.log("HERE");
        break;
    case "movie-this":
        getMovie();
        break;
    case "do-what-it-says":
        dothething();
        break;
};