
require("dotenv").config();


let request = require("request");
let fs = require("fs");
let keys = require("./keys.js");
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);

let search = process.argv[2]; 
let term = process.argv[3];

UserInputs(search, term);

function UserInputs (search, term){
    switch (search) {
    case 'concert-this':
        showConcertInfo(term);
        break;
    case 'spotify-this':
        showSongInfo(term);
        break;
    case 'movie-this':
        showMovieInfo(term);
        break;
    case 'do-what-it-says':
        showSomeInfo();
        break;
    default: 
        console.log("invalid command. Please input one of the options: \nconcert-this \nspotify-this \nmovie-this \ndo-what-it-says")
    }
}

function showConcertInfo(term){
    let queryUrl = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp";
    request(queryUrl, function(error, response, body) {
    
    if (!error && response.statusCode === 200) {
        let concerts = JSON.parse(body);
        for (let i = 0; i < concerts.length; i++) {  
            console.log("**********EVENT INFO*********");  
            fs.appendFileSync("random.txt", "**********EVENT INFO*********\n");
            console.log(i);
            fs.appendFileSync("random.txt", i+"\n");
            console.log("Name of the Venue: " + concerts[i].venue.name);
            fs.appendFileSync("random.txt", "Name of the Venue: " + concerts[i].venue.name+"\n");
            console.log("Venue Location: " +  concerts[i].venue.city);
            fs.appendFileSync("random.txt", "Venue Location: " +  concerts[i].venue.city+"\n");
            console.log("Date of the Event: " +  concerts[i].datetime);
            fs.appendFileSync("random.txt", "Date of the Event: " +  concerts[i].datetime+"\n");
            console.log("*****************************");
            fs.appendFileSync("random.txt", "*****************************"+"\n");
        }
    } else{
      console.log(term + " is not on tour right now");
    }
});}


function showSongInfo(term) {
    if (term === undefined) {
        term = "Hello";
    }
    spotify.search(
        {
            type: "track",
            query: term
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
            let songs = data.tracks.items;

            for (let i = 0; i < songs.length; i++) {
                console.log("**********SONG INFO*********");
                fs.appendFileSync("random.txt", "**********SONG INFO*********\n");
                console.log(i);
                fs.appendFileSync("random.txt", i +"\n");
                console.log("Song name: " + songs[i].name);
                fs.appendFileSync("random.txt", "song name: " + songs[i].name +"\n");
                console.log("Preview song: " + songs[i].preview_url);
                fs.appendFileSync("random.txt", "preview song: " + songs[i].preview_url +"\n");
                console.log("Album: " + songs[i].album.name);
                fs.appendFileSync("random.txt", "album: " + songs[i].album.name + "\n");
                console.log("Artist(s): " + songs[i].artists[0].name);
                fs.appendFileSync("random.txt", "artist(s): " + songs[i].artists[0].name + "\n");
                console.log("*****************************");  
                fs.appendFileSync("random.txt", "*****************************\n");
             }
        }
    );
};


function showMovieInfo(term){
    if (term === undefined) {
        term = "Mr. Nobody"
        console.log("-----------------------");
        fs.appendFileSync("random.txt", "-----------------------\n");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        fs.appendFileSync("random.txt", "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/" +"\n");
        console.log("It's on Netflix!");
        fs.appendFileSync("random.txt", "It's on Netflix!\n");
    }
    let queryUrl = "http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=b3c0b435";
    request(queryUrl, function(error, response, body) {
    // If the request is successful
    if (!error && response.statusCode === 200) {
        let movies = JSON.parse(body);
        console.log("**********MOVIE INFO*********");  
        fs.appendFileSync("random.txt", "**********MOVIE INFO*********\n");
        console.log("Title: " + movies.Title);
        fs.appendFileSync("random.txt", "Title: " + movies.Title + "\n");
        console.log("Release Year: " + movies.Year);
        fs.appendFileSync("random.txt", "Release Year: " + movies.Year + "\n");
        console.log("IMDB Rating: " + movies.imdbRating);
        fs.appendFileSync("random.txt", "IMDB Rating: " + movies.imdbRating + "\n");
        console.log("Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(movies));
        fs.appendFileSync("random.txt", "Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(movies) + "\n");
        console.log("Country of Production: " + movies.Country);
        fs.appendFileSync("random.txt", "Country of Production: " + movies.Country + "\n");
        console.log("Language: " + movies.Language);
        fs.appendFileSync("random.txt", "Language: " + movies.Language + "\n");
        console.log("Plot: " + movies.Plot);
        fs.appendFileSync("random.txt", "Plot: " + movies.Plot + "\n");
        console.log("Actors: " + movies.Actors);
        fs.appendFileSync("random.txt", "Actors: " + movies.Actors + "\n");
        fs.appendFileSync("random.txt", "*****************************\n");
        console.log("*****************************");  
    } else{
      console.log('Error occurred.');
    }

});}

function getRottenTomatoesRatingObject (data) {
    return data.Ratings.find(function (item) {
       return item.Source === "Rotten Tomatoes";
    });
  }
  
  function getRottenTomatoesRatingValue (data) {
    return getRottenTomatoesRatingObject(data).Value;
  }

//function for reading out ofrandom.txt file  
function showSomeInfo(){
	fs.readFile('random.txt', 'utf8', function(err, data){
		if (err){ 
			return console.log(err);
		}
        let dataArr = data.split(',');
        UserInputs(dataArr[0], dataArr[1]);
	});
}
