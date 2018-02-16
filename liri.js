// USAGE:
//`node liri.js my-tweets`
//
//   * This will show your last 20 tweets and when they were 
//   created at in your terminal/bash window.
// -----------------------------------
// `node liri.js spotify-this-song '<song name here>'`
//
//   * This will show the following information about the song in your terminal/bash window     
//     * Artist(s)
//     * The song's name
//     * A preview link of the song from Spotify
//     * The album that the song is from
//
//   * If no song is provided then your program will default to "The Sign" by Ace of Base.
//   * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
// -------------------------
// . `node liri.js movie-this '<movie name here>'`
//
//   * This will output the following information to your terminal/bash window:
//
//       * Title of the movie.
//       * Year the movie came out.
//       * IMDB Rating of the movie.
//       * Rotten Tomatoes Rating of the movie.
//       * Country where the movie was produced.
//       * Language of the movie.
//       * Plot of the movie.
//       * Actors in the movie.
//
//
//   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
//     
//     * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
//     
//     * It's on Netflix!
//   
//   * You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, 
//     the OMDB API requires an API key. You may use `trilogy`.
//

// Basic Node application for requesting data from the OMDB website
// Here we incorporate the "request" npm package
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
//var fs      = require('fs');
var read = require("read-file")
require("dotenv").config();

// Using the require keyword lets us access all of the exports
// in our ess.js file
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
//. `node liri.js do-what-it-says`
   
//   * Using the `fs` Node package, LIRI will take the text inside 
//   of random.txt and then use it to call one of LIRI's commands.     
//     * It should run `spotify-this-song` for "I Want it That Way," 
//     as follows the text in `random.txt`.
//     
//     * Feel free to change the text in that document to test out the feature for other commands.
if ( nodeArgs[2] == "do-what-it-says" )
{
   readCommandFile();
}


function readCommandFile() {

 read("random.txt", 'utf8', function(err, buffer) {
   //=> 'some contents...'
   //console.log("err "+err)
   //console.log("buf "+buffer)
   var ret = buffer.split(",");
   var command = ret[0];
   var arg = ret[1]
   console.log(command+" "+arg)
   spotifyThisSong(arg)
   //var command = buffer.toString()
   //console.log(command)
 });
}

if ( nodeArgs[2] == "movie-this" )
{
    GetMovieInfo();
}

function GetMovieInfo() 
{ 
  // Create an empty variable for holding the movie name
  var movieName = "";

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

  // Then run a request to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  // This line is just to help us debug against the actual URL.
  //console.log(queryUrl);

  request(queryUrl, function(error, response, body) {
  
    var Response=JSON.parse(body).Response;
    var ResponseError=JSON.parse(body).Error

  //console.log("Response "+Response)
  //console.log("Error "+ResponseError)
  //console.log(JSON.parse(body))  //parsed
  //console.log(body)

  // response sample (error):
  //$ node liri.js mr. nobody
  //http://www.omdbapi.com/?t=mr.+nobody&y=&plot=short&apikey=trilogy
  //{ Response: 'False', Error: 'Movie not found!' }

  // response sample (default):
  //{"Title":"Mr. Nobody","Year":"2009","Rated":"R","Released":"26 Sep 2013","Runtime":"141 min","Genre":"Drama, Fantasy, Romance","Director":"Jaco Van Dormael","Writer":"Jaco Van Dormael","Actors":"Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham","Plot":"A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn't choose, anything is possible.","Language":"English, Mohawk","Country":"Belgium, Germany, Canada, France, USA, UK","Awards":"11 wins & 5 nominations.","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTg4ODkzMDQ3Nl5BMl5BanBnXkFtZTgwNTEwMTkxMDE@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.9/10"},{"Source":"Rotten Tomatoes","Value":"66%"},{"Source":"Metacritic","Value":"63/100"}],"Metascore":"63","imdbRating":"7.9","imdbVotes":"179,074","imdbID":"tt0485947","Type":"movie","DVD":"25 Feb 2014","BoxOffice":"$3,600","Production":"Magnolia Pictures","Website":"http://www.magpictures.com/mrnobody/","Response":"True"}

  // response sample (not USA):
  // body: '{"Title":"Godfather","Year":"1991","Rated":"N/A","Released":"15 Nov 1991","Runtime":"150 min","Genre":"Comedy, Drama, Romance","Director":"Lal, Siddique","Writer":"Lal (screenplay,  story & dialogue), Siddique","Actors":"N.N. Pillai, Mukesh, Kanaka, Philomina","Plot":"Two youngsters from rival clans fall in love.","Language":"Malayalam","Country":"India","Awards":"2 wins.","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BZTkyYzc5MGEtYTBiYS00ZmYyLThlZWUtOWY3ZWE4ZDhlN2MzXkEyXkFqcGdeQXVyMjM0ODk5MDU@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.5/10"}],"Metascore":"N/A","imdbRating":"8.5","imdbVotes":"1,719","imdbID":"tt0353496","Type":"movie","DVD":"N/A","BoxOffice":"N/A","Production":"N/A","Website":"N/A","Response":"True"}' }
  // title Godfather
  // Release Year: 1991 Actors N.N. Pillai, Mukesh, Kanaka, Philomina
  //
  // If the request is successful
    if ( Response != "False" ) {
  //if (!error && response.statusCode === 200) {

  //       * Title of the movie.
  //       * Year the movie came out.
  //       * IMDB Rating of the movie.
  //       * Rotten Tomatoes Rating of the movie.
  //       * Country where the movie was produced.
  //       * Language of the movie.
  //       * Plot of the movie.
  //       * Actors in the movie.
  // Parse the body

      var country = JSON.parse(body).Country
      console.log("Title           : "+JSON.parse(body).Title+" ("+JSON.parse(body).Rated+")");
      console.log("Release Year    : "+JSON.parse(body).Year)
      console.log("IMDB Rating     : "+JSON.parse(body).imdbRating);
      //console.log("ratings "+JSON.parse(body).Ratings)
      if (JSON.parse(body).Ratings[1])
      //console.log("ratings exists")
    //if (JSON.parse(body).Ratings.length == 1)
        console.log("Rotten Tomatoes : "+JSON.parse(body).Ratings[1].Value)
      else
        console.log("Rotten Tomatoes : none")
      console.log("Country         : "+country);
      console.log("Language        : "+JSON.parse(body).Language);
      console.log("Plot            : "+JSON.parse(body).Plot);
      console.log("Actors          : "+JSON.parse(body).Actors);
      console.log("Awards          : "+JSON.parse(body).Awards);
    } // if Response is not False

 }); // end request
}

if ( nodeArgs[2] == "spotify-this-song")
   spotifyThisSong();

function spotifyThisSong(song)
{
var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});

/*`node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window    
     * Artist(s)    
     * The song's name 
     * A preview link of the song from Spotify
     * The album that the song is from

   * If no song is provided then your program will default to "The Sign" 
   by Ace of Base.

   note:
   type Required. A comma-separated list of item types to search across. 
   Valid types are: album, artist, playlist, and track.

   Search results will include hits from all the specified item types; 
   for example q=name:abacab&type=album,track will return 
   both albums and tracks with "abacab" in their name.
*/ 
//spotify.search({ type: 'track', query: 'The winner takes it all' })
var query = "";
//console.log("song "+song)
if (song == null)
{
  song = 'The Sign';
  var artist = 'Ace of Base';
  query = song+" "+artist;
 // console.log("song+artist "+query)

  console.log("nodeArgs length "+nodeArgs.length)
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
           console.log("query "+query)
         }
      }
 }
}
else
{
   query = song;
   //console.log("file "+query) 
}
  
spotify.search({ type: 'track', query: query })
 .then(function(response) {
    //console.log(JSON.stringify(response,null,2));
    console.log("ARTIST : "+response.tracks.items[0].artists[0].name,
              "\nNAME   : "+response.tracks.items[0].name,
              "\nLINK   : "+response.tracks.items[0].album.external_urls.spotify,
              "\nALBUM  : "+response.tracks.items[0].album.name)

  })
  .catch(function(err) {
    console.log(err);
  });
} // end spotify

//var client = new Twitter(keys.twitter);
if ( nodeArgs[2] == "my-tweets")
    GetMyTweets();

//`node liri.js my-tweets`
//
//   * This will show your last 20 tweets and when they were 
//   created at in your terminal/bash window.
//
function GetMyTweets() {
  var client = new Twitter(keys.twitter);


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
      // console.log(tweets.search_metadata.count) // number requested
//console.log(tweets.statuses.length)
       // use length for number of tweets returned
       console.log("MY TWEETS")
       for(var i = 0; i < tweets.statuses.length; i++){
         var tweet = [];
         if ( tweets.statuses[i] != undefined )
          {
           var created = tweets.statuses[i].created_at;
           //console.log("i "+i+" date "+created)
           var text = tweets.statuses[i].text;
           // tweet object
           tweet[i+1] = {
             created: created, 
             text: text
           };
         tweetsArray[i] = tweet[i+1];
         console.log("-----------------"+" Tweet # "+(i+1)+" -----------------")
         console.log(tweet[i+1].created+"\n"+tweet[i+1].text)
       }

      }
       console.log("----------------------------------------------") 
    }
});
} //end my-tweets

