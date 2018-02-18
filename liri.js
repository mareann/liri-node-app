//
// LIRI is a Language Interpretation and Recognition Interface
// Basic Node application for requesting data
// LIRI is a command line node app that takes in parameters and 
// returns data on your bash window
//
// Uses popular APIs to display tweets, songs and movie information for the user.
//
// Author: Maryann Jordan
//
// See README.md for additional information
//
// USAGE:
//  `node liri.js my-tweets`
//
//   * This will show your last 20 tweets and when they were 
//   created at in your terminal/bash window.
//  -----------------------------------
//  `node liri.js spotify-this-song '<song name here>'`
//
//   * This will show the following information about the song in your terminal/bash window     
//     * Artist(s)
//     * The song's name
//     * A preview link of the song from Spotify
//     * The album that the song is from
//
//   * If no song is provided then your program will default to "The Sign" by Ace of Base.
//   * Utilizes the [node-spotify-api] to retrieve song information from the Spotify API.
//  -------------------------
//  `node liri.js movie-this '<movie name here>'`
//
//   * This will output the following information to your terminal/bash window:
//       * Title of the movie.
//       * Year the movie came out.
//       * IMDB Rating of the movie.
//       * Rotten Tomatoes Rating of the movie.
//       * Country where the movie was produced.
//       * Language of the movie.
//       * Plot of the movie.
//       * Actors in the movie.
//   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'  
//   * Uses the request package to retrieve data from the OMDB API.
//  --------------------------------
//. `node liri.js do-what-it-says`
   
//   * Using the `read-file` Node package, LIRI will take the text inside 
//   of random.txt and then use it to call one of LIRI's commands.     
//     * It can run `spotify-this-song` for "I Want it That Way," 
//     as follows the text in `random.txt`:
//      spotify-this-song,"I want it that way"
//      or 
//      For tweets random.txt should read like
//       my-tweets
//      or 
//      For movies random.txt should read like
//       movie-this,the godfather
// -----------------------------------------------

// Here we incorporate the npm packages
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var read = require("read-file")
var fs = require("fs")
require("dotenv").config();

// Using the require keyword lets us access all of the exports
// in our keys.js file
var keys = require("./keys.js");

// Store all of the arguments in an array
var nodeArgs = process.argv;

// This will print everything in exports.
if ( 0 )
{
  console.log("--------------------------");
  console.log("ALL THE STUFF I NEED");
  console.log(keys);
  console.log("--------------------------");

  // These will print correctly because we imported them
  console.log("Essentials");
  console.log(keys.twitter.consumer_key);
  console.log("--------------------------");
  console.log("Nice to Haves");
  console.log(keys.twitter.access_token_key);
  console.log(keys.spotify.id);
  console.log(keys.spotify.secret)
}

// determine the command
var command = nodeArgs[2];
switch (command) {
    case "my-tweets":
           GetMyTweets();
                 break;
    case "spotify-this-song":
            spotifyThisSong();
            break;
    case "movie-this":
            GetMovieInfo();
            break;
    case "do-what-it-says":
            runCommandFile();
            break
    default:
      break;
}

function writeLog(command) {
  var textFile = "log.txt"
  var text = command+"\n"

  fs.appendFile(textFile, text, function(err) {

  // If an error was experienced we say it.
  if (err) {
    console.log(err);
  }

  // If no error is experienced, we'll log the phrase "Content Added" to our node console.
  //else 
  //  console.log("Content Added to "+textFile+"!");
});
}
/////////////////////////////////////////
//  do-what-it-says command
//  runCommandFile
//  read random.txt file and 
//  run its command
////////////////////////////////////////
function runCommandFile() {

 read("random.txt", 'utf8', function(err, buffer) {

   var ret = buffer.split(",");
   var command = ret[0];
   var arg = ret[1]

   if ( command == 'spotify-this-song')
   {
     var myText = "do-what-it-says "+command+" "+arg
     console.log(myText)
     writeLog(myText)
     spotifyThisSong(arg)
   }
   if ( command === "my-tweets")
       GetMyTweets();
   if ( command === "movie-this")
       GetMovieInfo(arg);
 });
}
/////////////////////////////////////////
//  movie-this command
//  GetMovieInfo
//   
//  run its command
////////////////////////////////////////
function GetMovieInfo(arg) 
{ 
  // Create an empty variable for holding the movie name
  var movieName = "";
  
  if ( arg == null)
  {
  // Loop through all the words in the node argument
  // And do a little for-loop magic to handle the inclusion of "+"s
  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length)
      movieName = movieName + "+" + nodeArgs[i];
    else 
      movieName += nodeArgs[i];
  } // end for

  if ( nodeArgs.length == 3 )
    movieName = "Mr Nobody"
  }
  else
    movieName = arg;
  // Then run a request to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function(error, response, body) {
  
    var Response=JSON.parse(body).Response;
    var ResponseError=JSON.parse(body).Error
 
  // If the request is successful
    if ( Response != "False" ) {
      var country    = JSON.parse(body).Country
      var movie      = JSON.parse(body).Title
      var movieTitle = "\nTitle           : "+JSON.parse(body).Title+" ("+JSON.parse(body).Rated+")"
      var movieYear  = "\nRelease Year    : "+JSON.parse(body).Year
      var IMDBRating = "\nIMDB Rating     : "+JSON.parse(body).imdbRating
      if (JSON.parse(body).Ratings[1])
        var movieRT  = "\nRotten Tomatoes : "+JSON.parse(body).Ratings[1].Value
      else
        var movieRT  = "\nRotten Tomatoes : none"
      var movieCountry   = "\nCountry         : "+country
      var movieLanguage  = "\nLanguage        : "+JSON.parse(body).Language
      var moviePlot      = "\nPlot            : "+JSON.parse(body).Plot
      var movieActors    = "\nActors          : "+JSON.parse(body).Actors
      var movieAwards    = "\nAwards          : "+JSON.parse(body).Awards

      command = "----------------\n"+command +" "+movie
      //console.log(command)
      command = command+movieTitle+movieYear+IMDBRating+movieRT+movieCountry+
      movieLanguage+moviePlot+movieActors+movieAwards
      console.log(command)
      writeLog(command)
    } // if Response is not False
   else
    console.log(movieName+"movie not found. Please remove any punctuation like a .")
 }); // end request
} // end GetMovieInfo

/////////////////////////////////////////
//  spotify-this-song command
//  spotifyThisSong
//  output song infomation to user screen
//  arg song only needed for do-it-as-it-says
////////////////////////////////////////
function spotifyThisSong(song)
{
  var spotify = new Spotify(keys.spotify)

  var query = "";

  if (song == null)
  {
    // default
    song = 'The Sign';
    var artist = 'Ace of Base';
    query = song+" "+artist;

   if ( nodeArgs.length >= 4 )
    {
      query = " ";
      for ( var i = 3; i<nodeArgs.length;i++)
       {
         if ( nodeArgs[i] != undefined )
          {
            if (i === 3)
             query = nodeArgs[3];
            else
             query += " "+nodeArgs[i];
         }
       }
    }
  } // end song is null
  else
    // from random.txt file for song name 
    query = song;

  spotify.search({ type: 'track', query: query })
   .then(function(response) {
    //console.log(JSON.stringify(response,null,2));
    var songName   = response.tracks.items[0].name
    var songArtist =   "ARTIST : "+response.tracks.items[0].artists[0].name
    var songOut    = "\nNAME   : "+songName
    var songLink   = "\nLINK   : "+response.tracks.items[0].album.external_urls.spotify
    var songAlbum  = "\nALBUM  : "+response.tracks.items[0].album.name
    var outScreen = songArtist+songOut+songLink+songAlbum;
    //console.log(outScreen);
    command = "----------------\n"+command+" "+songName+"\n"+outScreen;
     console.log(command)
     writeLog(command)
    })
   .catch(function(err) {
      console.log(err);
   });
} // end spotifyThisSong

/////////////////////////////////////////
//  my-tweets command
//  GetMyTweets
//  output recent tweets to user screen
////////////////////////////////////////
function GetMyTweets() {
  var client = new Twitter(keys.twitter);
  
  command += "\n"
  //post twitter status
  if (0)
  {
    client.post('statuses/update', 
     {status: 'Mary having fun at https://bootcamp.northwestern.edu/'},
     function(error, tweet, response) {
     if (!error) {
       console.log("tweet "+JSON.stringify(tweet));
     }
     else
  	   console.log("error "+JSON.stringify(error))
    });
  }
  // Set up your search parameters
  var params = {
   q: 'roundtuit99',
   count: 20,
   result_type: 'recent',
   lang: 'en'
  }
 var tweetsArray = [];
 client.get(
   'search/tweets', params, function(error, tweets, response) {
     if (!error)
      {
      // tweets.search_metadata.count // number requested
       console.log("MY TWEETS")
       for(var i = 0; i < tweets.statuses.length; i++){
         var tweet = [];
         if ( tweets.statuses[i] != undefined )
          {
           var created = tweets.statuses[i].created_at;
           var text = tweets.statuses[i].text;
           // tweet object
           tweet[i+1] = {
             created: created, 
             text: text
           };
         tweetsArray[i] = tweet[i+1];
         var tweetText = "-----"+" Tweet # "+(i+1)+" "+tweet[i+1].created+" "+tweet[i+1].text+"\n"
         console.log(tweetText)
         command += tweetText
       }
      }
      writeLog(command) 
    } // end if no error
 }); // end client.get
} //end GetMyTweets

