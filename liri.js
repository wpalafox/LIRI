//variables to call the information 
//sets up 
var twitter = require('twitter');
var spotify = require('spotify');
var keys = require("./keys.js");
var command = process.argv.slice(2);  //Why .slice(2)??
var twitterKeys = keys.twitterKeys;
//var spotifyKeys = keys.spotifyKeys; 


//this assigns the variable to my twitter keys
var client = new twitter({
	
	consumer_key: twitterKeys.consumer_key,
	consumer_secret: twitterKeys.consumer_secret,
	access_token_key: twitterKeys.access_token_key,
	access_token_secret: twitterKeys.access_token_secret,


});

//Switch Logic to make commands 

switch(command[0]){
	
	case "my-tweets":
	myTweets();
	break;

	/*case "spotify-this-song":
	goSpotify();
	break;  */

	default:
	console.log("err");

}



//Functions 
/////////////////////////////////////////////////////////


//TWITTER 

function myTweets() {


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

 /*function goSpotify() {

	/*spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
    	if ( err ) {
        	console.log('Error occurred: ' + err);
        	return;
    	} 

	console.log("test"); 






}; */

