require("dotenv").config();

var fs = require('fs');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var keys = require('./keys.js');
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

//here is the function to call Twitter
var tweets = function () {
    var parameters = { screen_name: 'Phlip_Deez', count:10 };

    client.get('statuses/user_timeline', parameters , function (error, tweets, response){
        var data = [];
        if (error) {
            console.log("Error: " + error);
            return error;
        }
        for (let i = 0; i < tweets.length; i++) {
            var newTweets = tweets[i];
            data.push({
                'Created on': tweets[i].created_at,
                'Tweets ': tweets[i].text,
            });
        }
        console.log(data);
    })
}

//here is the function to call Spotify
var artistName = function (artist) {
    return artist.name;
}

var spotifySongs = function (songName) {
    spotify.search({ type: 'track', query: songName}, function (error, data){
        if (error) {
            console.log('Error occured ' + error);
            return;
        }
        if (songName === undefined) {
            songName = 'Welcome to the jungle';
        }
        var songs = data.tracks.items;
        var data = [];
        for (let i = 0; i < 1; i++) {
            var foo = songs[i];
            data.push({
                'Artist(s)': songs[i].artists.map(artistName),
                'Song Name': songs[i].name,
                'Song Preview': songs[i].preview_url,
                'Album': songs[i].album.name
            })  
        }
        console.log(data);
    })
}


//here is the OMDB functions
var omdbMovies = function(movieName){
    if (movieName === undefined){
        movieName = 'Mr. Nobody';
    }

    var urlOmdb = 'http://www.omdbapi.com/?apikey=7ab0ddad&t=' + movieName + '&y=&plot=full&tomatoes-true&r=json';
    request (urlOmdb, function (error, response, body) {
        var data = [];
        var jsonData = JSON.parse(body);
        data.push({
            'Title ': jsonData.Title,
            'Year ': jsonData.Year,
            'Rated': jsonData.Rated,
            'IMDB Rating': jsonData.imdbRating,
            'Country': jsonData.Country,
            'Language': jsonData.Language,
            'Plot': jsonData.Plot,
            'Actors': jsonData.Actors,
        })
        console.log(data);
        if (error) {
            console.log(error);
            return error;
        }
    })
}

//here is do-what-it-says
function doWhatItSays() {
    fs.readFile('random.txt', 'utf8', function(error, data){
        var textArray = data.split(',');
        console.log(data);
        if (textArray.length == 2) {
            pick(textArray[0], textArray[1]);
        } else if (textArray.length == 1) {
            pick(textArray[0]);
        }
    })
}


//here is where the arguments are called
var pick = function (caseData, functionData) {
    switch (caseData) {
        case 'my-tweets':
            tweets();
            break;
        case 'spotify-this-song':
            spotifySongs(functionData);
            break;
        case 'movie-this':
            omdbMovies(functionData);
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
    }
}

var runLiri = function (argumentOne, arguementTwo) {
    pick(argumentOne, arguementTwo);
};
runLiri(process.argv[2], process.argv[3]);