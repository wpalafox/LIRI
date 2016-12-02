//variables to call the information 
//sets up 
var fs = require("fs");
var twitter = require('twitter');
var spotify = require('spotify');
var keys = require("./keys.js");
var command = process.argv.slice(2);  //The first 2 elements "node" and "file.name" will always be present, so we will slice ahead by 2 to begin the commands
var twitterKeys = keys.twitterKeys;
//var spotifyKeys = keys.spotifyKeys; 




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


	default:
		console.log("err");
	
}



//Functions 
/////////////////////////////////////////////////////////


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
		
		//Loop through the last 20 tweets and stamp the date add 
		for(i=0; i < 20; i++){
			console.log(i+ 1 + ". "+tweets[i].text+"\n"+"    Date: "+tweets[i].created_at);

		}
	

	}else{

		console.log(error);

	}

});

}

////////////////////////////////////////////////////////

//SPOTIFY

 function goSpotify(songName) {

	if (songName == undefined){

		songName = "Barbie Girl"


	}

	spotify.search({ type: 'track', query: songName }, function(err, data){
    	if (err) {
        	console.log('Error occurred: ' + err);
        	return;
    	
    	}else{
    		var rawData = data.tracks.items;

    			
    		console.log(rawData);



			}

		}); 

	}
