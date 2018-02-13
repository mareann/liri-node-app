// Basic Node application for requesting data from the OMDB website
// Here we incorporate the "request" npm package
var request = require("request");
var Twitter = require('twitter');
require("dotenv").config();

// Using the require keyword lets us access all of the exports
// in our ess.js file
var keys = require("./keys.js");

// This will print everything in exports.
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

//var client = new Twitter(keys.twitter);

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
client.post('statuses/update', {status: 'Mary is a tweet'}, function(error, tweet, response) {
  if (!error) {
    console.log("tweet "+JSON.stringify(tweet));
  }
  else
  	console.log("error "+JSON.stringify(error))
});
/*
client.post('statuses/update', {status: 'I Love Twitter'})
  .then(function (tweet) {
    console.log(tweet);
  })
  .catch(function (error) {
    throw error;
  })*/
  /*
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  	//console.log("response"+response);
    console.log(tweets);
  }
  else 
  	console.log(error);
});*/
/*
client.post('statuses/update', {status: 'I Love Twitter'},  function(error, tweet, response) {
  if(error) throw error;
  console.log(tweet);  // Tweet body. 
  console.log(response);  // Raw response object. 
});*/
