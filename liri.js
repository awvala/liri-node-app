// Require the following NPM modules
require("dotenv").config();
const keys = require("./keys.js");
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require('request');
const fs = require('fs-extra')
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);

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
function getMusic(songRequest) {
    spotify.search({type: 'track', query: songRequest}, function(err, data) {
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

// OMDB requests
function getMovie() {
    var movieTitle = process.argv[3];

    if (!movieTitle) {
        movieTitle = "Firefly";
    }

    // Removing spaces of movie/tv Show search to return correctly formatted requests for API call
    movieTitle = movieTitle.split(' ').join('+');
    var queryURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + movieTitle + "&y=&plot=short&tomatoes=true&r=json";
    request(queryURL, function(error, response, body) {
        if (error) {
            return console.log('Error occurred: ' + error);
        } else {
            var movieData = JSON.parse(body);
            console.log("Title:  " + movieData.Title);
            console.log("Director:  " + movieData.Director);
            console.log("Writer:  " + movieData.Writer);
            console.log("Year:  " + movieData.Year);
            console.log("Plot:  " + movieData.Plot);
            console.log("Actors:  " + movieData.Actors);
            console.log("IMDB Rating:  " + movieData.imdbRating);
            console.log("Tomatometer:  " + movieData.tomatoMeter);
            console.log("Country of origin:  " + movieData.Country);
            console.log("Language:  " + movieData.Language);
        }
    })
};

// Random.text LIRI Command
function dothething() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log('Error occurred: ' + error);
        } else {
            var randArray = data.split(",");
            liriArgument = randArray[1];
            getMusic(liriArgument);
        }
    })
};

// Determine which function to run
switch (liriCommand) {
    case "my-tweets":
        getTweets();
        break;
    case "spotify-this-song":
        var songRequest = liriArgument;
        if (songRequest === undefined) {
            songRequest = "The Sign";
        }
        getMusic(songRequest);
        break;
    case "movie-this":
        getMovie();
        break;
    case "ju-lee":
        dothething();
        break;
};