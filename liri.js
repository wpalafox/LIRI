//variables to call the information 
//sets up 
var fs = require("fs");
var request = require('request');
var twitter = require('twitter');
var spotify = require('spotify');
var keys = require("./keys.js");
var command = process.argv.slice(2);  //The first 2 elements "node" and "file.name" will always be present, so we will slice ahead by 2 to begin the commands
var twitterKeys = keys.twitterKeys;
//var spotifyKeys = keys.spotifyKeys; 


//Functions for the switch cases to refer to
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//TWITTER 

function myTweets() {


//this assigns client variable to the twitter keys
var client = new twitter({
	
	consumer_key: twitterKeys.consumer_key,
	consumer_secret: twitterKeys.consumer_secret,
	access_token_key: twitterKeys.access_token_key,
	access_token_secret: twitterKeys.access_token_secret,


});


var params = {screen_name: 'thanksdude25'};
client.get('statuses/user_timeline', params, function(error, tweets, response){
	if (!error){
		console.log("##########################################################################")
		//Loop through the last 20 tweets and stamp the date add 
		

		console.log('Last 20 Tweets')
		for(i=0; i < 20; i++){
			console.log(i+ 1 + ". "+tweets[i].text);  
			console.log("Date: "+tweets[i].created_at);
		}
		
		console.log("##########################################################################")
	}else{

		console.log(error);

	}

});

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//SPOTIFY

 function goSpotify(songName) {

	if (songName == undefined){

		songName = "The Sign"


	}

	spotify.search({ type: 'track', query: songName }, function(err, data){
    	if (err) {
        	console.log('Error occurred: ' + err);
        	return;
    	
    	}else{
    		var response = data.tracks.items;

    		console.log("##########################################################################")
    		console.log("Top 3 Search Results");
    		for(s = 0; s < 3; s++){
    		
    		
    			console.log(s+1+". ");
    			console.log("Artist: "+ response[s].artists[0].name);
    			console.log("Track Title: " + response[s].name);
    			console.log("Preview Link: " + response[s].external_urls.spotify);
    			console.log("Album: "+ response[s].album.name);

    		
    		



    			}

    		console.log("##########################################################################")

			}

		}); 

	}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function goMovie(movieName){

	if(movieName === undefined){


		movieName = "Mr. Nobody";


	}
	

	queryURL =  "http://www.omdbapi.com/?tomatoes=true&t=" + movieName,


	request(queryURL, function (error, response, body) {
  
	  if (!error && response.statusCode == 200) {
	    
	    //Need to parse movieData or it will console.log as undefined
	  	var movieData = JSON.parse(body);
	    
	    console.log("##########################################################################");
	    console.log("Movie Information")
	    console.log(movieData.Title); 
	  	console.log(movieData.Year);
	  	console.log(movieData.Title);
	  	console.log(movieData.imdbRating); 
	  	console.log(movieData.Country);
	  	console.log(movieData.Language);
	  	console.log(movieData.Plot); 
	  	console.log(movieData.Actors);
	  	console.log(movieData.tomatoURL);
	  	console.log("##########################################################################");


		
		}});
  	
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function doWhat(){

	 fs.readFile("random.txt", "utf8", function(error, fileData) {
        //File data.split increases legibility 
        var dataArr = fileData.split(',');
        var controlWord = dataArr[0];
        

        switch (controlWord){
            
            case "my-tweets":
                myTweets();
            	break;

            case "spotify-this-song":
                var songName="";
                songName = dataArr[1];
                goSpotify(songName);
            	break;

            case "movie-this":
                var movieName="";
                movieName = dataArr[1];
                goMovie(movieName);
            	break;

            default:
                
                console.log("Do what it says has encountered an error");
                //format c:
        




        	}
    	});

}


//Switch Logic to make commands 

switch(command[0]){
	
	case "my-tweets":
		myTweets();
		break;

	case "spotify-this-song":
		var songName = "";
		songName = command[1]
		goSpotify(songName);
		break;  

	case "movie-this":
		var movieName = "";
		movieName = command[1];
		goMovie(movieName);

	case "do-what-it-says":
		  doWhat(); 
		  break;

	default:
		console.log("err");
	
}