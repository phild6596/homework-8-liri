require("dotenv").config();

var fs = require('fs');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var keys = require('./keys.js');
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

console.log(client);
console.log(spotify);
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


//here is the function to call spotify


//here is the function to call OMDB


//here is the what it says function


//here is the write to log function