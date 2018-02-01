require("dotenv").config();

var fs = require('fs');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var keys = require('./keys.js');
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

//console.log(client);
//console.log(spotify);
//Write to random.txt
var randomTxt = function (data) {
    fs.appendFile('random.txt', '\r\n\r\n');
    fs.appendFile('random.txt', JSON.stringify(data), function (error) {
        if (error) {
            return error;
            console.log(error);
        }
    });
}

//here is the function to call Twitter
var tweets = function () {
    var parameters = { screen_name: 'Phlip_Deez', count:10 };

    client.get('statuses/user_timeline', parameters , function (error, tweets, response){
        var data = [];
        for (let i = 0; i < tweets.length; i++) {
            var newTweets = tweets[i];
            //console.log(newTweets);
            data.push({
                'Created at': tweets[i].created_at,
                'Tweets ': tweets[i].text,
            });
                if (error) {
                return error;
                }
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
        for (let i = 0; i < songs.length; i++) {
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


//here is the what it says function


//here is where the arguments are called
var pick = function (caseData, functionData) {
    switch (caseData) {
        case 'my-tweets':
            tweets();
            break;
        case 'spotify-this-song':
            spotifySongs(functionData);
            break;
    }
}

var runLiri = function (argumentOne, arguementTwo) {
    pick(argumentOne, arguementTwo);
};
runLiri(process.argv[2], process.argv[3]);
