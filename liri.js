// packages need for the program
require("dotenv").config();
let axios = require('axios');
let fs = require('fs');
let keys = require("./keys.js");
// let spotify = new Spotify(keys.spotify);
var moment = require('moment');

// create command list
let search = process.argv[2];
let term = process.argv.slice(3).join(" ");

//arr to keep the results
let result = [];

// concert-this  (node liri.js concert-this <BAND NAME>) search the bands in town events for an artist and render the information needed
let concertThis = function(){
    this.findArtist = function(lineup){
        let URL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp";

        axios.get(URL).then(function(response){
            let jsonData = response.data;
            
            let artistData = [
                'Name of Venue: ' + jsonData.lineup,
                'Venue location: ' + jsonData.venue,
                'Date of the Event: ' + jsonData.datetime,
            ].join('\n\n');
            fs.appendFile("log.txt", function(err){
                if (err) throw err;
                console.log("Error occured: " + err);
                console.log(concertThis());
            });
        });
    };
};

//spotify-this-song (node liri.js spotify-this-song <SONG NAME>) this will show user the artists, name, preview link from spotify, the album information

// movie-this (node liri.js movie-this <MOVIE NAME>) retrive information from OMDB
    //if user does not type a movie, program needs to default data about Mr. Nobody

// do-what-it-says
