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
