# liri-node-app
LIRI is a Language Interpretation and Recognition Interface

LIRI is a command line node app that takes in parameters and gives you back data.

Uses popular APIs to display tweets, songs and movie information for the user.

To retrieve the data that will power this app, you'll need to send requests to the Twitter, Spotify and OMDB APIs. 
You'll find these Node packages here:

   * [Twitter](https://www.npmjs.com/package/twitter)
   
   * [Spotify](https://www.npmjs.com/package/node-spotify-api)
   
   * [Request](https://www.npmjs.com/package/request)

     * You'll use Request to grab data from the [OMDB API](http://www.omdbapi.com).

   * [DotEnv](https://www.npmjs.com/package/dotenv)

Set up your .env file with your Twitter and Spotify Keys

USAGE options:

  1   Display your tweets
  
      `node liri.js my-tweets`
      
      This will show your last 20 tweets and when they were created at in your terminal/bash window.
      
  2   Display spotify information for a song
  
      `node liri.js spotify-this-song '<song name here>' 
      
      This will show the following information about the song in your terminal/bash window    
      
       * Artist(s)
       
       * The song's name
       
       * A preview link of the song from Spotify
       
       * The album that the song is from

  3   Display movie information
  
       `node liri.js movie-this '<movie name here>'`
       
        This will output the following information to your terminal/bash window:
       
         * Title of the movie. (parental rating)
         
         * Year the movie came out.
         
         * IMDB Rating of the movie.
         
         * Rotten Tomatoes Rating of the movie.
         
         * Country where the movie was produced.
         
         * Language of the movie.
         
         * Plot of the movie.
         
         * Actors in the movie.
         
         * Awards


  4    random.txt command file
  
       `node liri.js do-what-it-says`
       
 Make a file called `random.txt` to use the do-it-this-way command.
       
   * Inside of `random.txt` put one of the following in with no extra characters or white space:
   
     spotify-this-song,"I Want it That Way"
     
     or
     
     movie-this,the godfather

     or
     
     my-tweets
-------------------------------
NOTES
-------------------------------

   movie-this response sample (error):
  
   $ node liri.js movie-this mr. nobody
  
   { Response: 'False', Error: 'Movie not found!' }

    movie-this response sample (default):

  $ node liri.js movie-this

   {"Title":"Mr. Nobody","Year":"2009","Rated":"R","Released":"26 Sep 2013","Runtime":"141 min","Genre":"Drama, Fantasy, Romance","Director":"Jaco Van Dormael","Writer":"Jaco Van Dormael","Actors":"Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham","Plot":"A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn't choose, anything is possible.","Language":"English, Mohawk","Country":"Belgium, Germany, Canada, France, USA, UK","Awards":"11 wins & 5 nominations.","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTg4ODkzMDQ3Nl5BMl5BanBnXkFtZTgwNTEwMTkxMDE@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.9/10"},{"Source":"Rotten Tomatoes","Value":"66%"},{"Source":"Metacritic","Value":"63/100"}],"Metascore":"63","imdbRating":"7.9","imdbVotes":"179,074","imdbID":"tt0485947","Type":"movie","DVD":"25 Feb 2014","BoxOffice":"$3,600","Production":"Magnolia Pictures","Website":"http://www.magpictures.com/mrnobody/","Response":"True"}

   movie-this response sample (not USA;does not display rotten tomatoes):
  
  $ node liri movie-this godfather
  
  body: '{"Title":"Godfather","Year":"1991","Rated":"N/A","Released":"15 Nov 1991","Runtime":"150 min","Genre":"Comedy, Drama, Romance","Director":"Lal, Siddique","Writer":"Lal (screenplay,  story & dialogue), Siddique","Actors":"N.N. Pillai, Mukesh, Kanaka, Philomina","Plot":"Two youngsters from rival clans fall in love.","Language":"Malayalam","Country":"India","Awards":"2 wins.","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BZTkyYzc5MGEtYTBiYS00ZmYyLThlZWUtOWY3ZWE4ZDhlN2MzXkEyXkFqcGdeQXVyMjM0ODk5MDU@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.5/10"}],"Metascore":"N/A","imdbRating":"8.5","imdbVotes":"1,719","imdbID":"tt0353496","Type":"movie","DVD":"N/A","BoxOffice":"N/A","Production":"N/A","Website":"N/A","Response":"True"}' }

 $ node liri spotify-this the winner takes it all
 
 response sample data (partial)
 
 {
  "tracks": {
    "href": "https://api.spotify.com/v1/search?query=The+winner+takes+it+all&type=track&offset=0&limit=20",
    "items": [
      {
        "album": {
          "album_type": "album",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/0LcJLqbBmaGUft1e9Mm8HV"
              },
              "href": "https://api.spotify.com/v1/artists/0LcJLqbBmaGUft1e9Mm8HV",
              "id": "0LcJLqbBmaGUft1e9Mm8HV",
              "name": "ABBA",
              "type": "artist",
              "uri": "spotify:artist:0LcJLqbBmaGUft1e9Mm8HV"
            }
          ],
          "available_markets": [
            "CA",
            "MX",
            "US"
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/5PVuX09frPq7AMYkkdcDfR"
          },
          "href": "https://api.spotify.com/v1/albums/5PVuX09frPq7AMYkkdcDfR",
          "id": "5PVuX09frPq7AMYkkdcDfR",
....

$ node liri.js my-tweets

response sample data (partial)

{ statuses: 
   [ { created_at: 'Wed Feb 14 23:38:52 +0000 2018',
       id: 963920509216882700,
       id_str: '963920509216882688',
       text: 'How to search your own tweets on Twitter https://t.co/xX5EOOQ6TY via @mashable',
       truncated: false,
       entities: [Object],
       metadata: [Object],
       source: '<a href="http://twitter.com" rel="nofollow">Twitter Web Client</a>',
       in_reply_to_status_id: null,
       in_reply_to_status_id_str: null,
       in_reply_to_user_id: null,
       in_reply_to_user_id_str: null,
       in_reply_to_screen_name: null,
       user: [Object],
       geo: null,
       coordinates: null,
       place: null,
       contributors: null,
       is_quote_status: false,
       retweet_count: 0,
       favorite_count: 0,
       favorited: false,
       retweeted: false,
       possibly_sensitive: false,
       lang: 'en' },
     { created_at: 'Wed Feb 14 22:31:16 +0000 2018',
       id: 963903496465633300,
       id_str: '963903496465633280',
       text: 'Mary J is a sweet tweety bird',
       truncated: false,
       entities: [Object],
       metadata: [Object],
       source: '<a href="http://google.com" rel="nofollow">LiriMary</a>',
       in_reply_to_status_id: null,
       in_reply_to_status_id_str: null,
       in_reply_to_user_id: null,
       in_reply_to_user_id_str: null,
       in_reply_to_screen_name: null,
       user: [Object],
       geo: null,
       coordinates: null,
       place: null,
       contributors: null,
       is_quote_status: false,
       retweet_count: 0,
...
