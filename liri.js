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
//here is the function to call OMDB


//here is the what it says function


//here is where the arguments are called
var pick = function (caseData, functionData) {
    switch (caseData) {
        case 'my-tweets':
        tweets();
        break;
    }
}

var runLiri = function (argumentOne, arguementTwo) {
    pick(argumentOne, arguementTwo);
};
runLiri(process.argv[2], process.argv[3]);
