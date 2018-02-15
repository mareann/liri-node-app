// Basic Node application for requesting data from the OMDB website
// Here we incorporate the "request" npm package
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
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

/*
var spotify = new Spotify({
  id: '82af7591abe4452cb92d259ef4972dd4',
  secret: 'f33afec276854bf78d1eded32abeede2'
});
*/

var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});

spotify.search({ type: 'track', query: 'The winner takes it all' })
 .then(function(response) {
    console.log(JSON.stringify(response,null,2));
  })
  .catch(function(err) {
    console.log(err);
  }); 
/* , function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
  else
    console.log("what?")
console.log(data);*/ 
//);

//var client = new Twitter(keys.twitter);
if ( nodeArgs[2] == "my-tweets")
{
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

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
      //console.log(tweets.statuses[1].text)
      // console.log(JSON.parse(tweets.statuses));
      // console.log(tweets.search_metadata.count) // number requested
//console.log(tweets.statuses.length)
       // use length for number of tweets returned
       console.log("MY TWEETS")
       for(var i = 0; i < tweets.statuses.length; i++){
         var tweet = [];
         if ( tweets.statuses[i] != undefined )
        //  console.log("i "+i+" undef")
        //else
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
         console.log(i+"-------------------------------")
         console.log(tweet[i+1].created+"\n"+tweet[i+1].text)
       }

      }
       console.log("-------------------------------") 
    }
});
} //end my-tweets

