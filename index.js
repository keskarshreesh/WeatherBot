//Requirements initialized
var request = require('request');  
var builder = require('botbuilder'); 
var apiairecognizer = require('api-ai-recognizer');

var connector = new builder.ConsoleConnector().listen(); //Connector for CLI
var bot = new builder.UniversalBot(connector); //Initialize new bot
var recognizer = new apiairecognizer("62dfd852831a47e7ab0630a6e231673e"); //The string entered is the key obtained from api.ai. Instructions to obtain key in README file

//For using Intents trained in Dialogflow.
var intents = new builder.IntentDialog({
         recognizers: [recognizer]
});

bot.dialog('/',intents);//For using intents with bot

//for weather query(main part)
intents.matches('findWeather',[
    function(session,args){
        var city = builder.EntityRecognizer.findEntity(args.entities,'cities'); //searches for city name in entities
	//If found:
        if (city){
            var city_name = city.entity
            var url = "http://api.apixu.com/v1/current.json?key=e3480d7c809340a5b0f52606181607&q=" + city_name;//call to api. Key string will be unique for respective API and user.
            request(url,function(error,response,body){
                body = JSON.parse(body);
                temp = body.current.temp_c;
                session.send("It's " + temp + " degrees celsius in " + city_name);
            });
        else{
            //If not found or not recognized, bot asks user again for the name of the city.
            builder.Prompts.text(session, 'Which city do you want the weather for?');
        }
    },
    function(session,results){
	//Continuation from response received in else condition above(if any), waterfall implemented(refer to Azure Bot Service Docs).
        var city_name = results.response;
        var url = "http://api.apixu.com/v1/current.json?key=e3480d7c809340a5b0f52606181607&q=" + city_name;//call to API
            request(url,function(error,response,body){
                body = JSON.parse(body);
                temp = body.current.temp_c;
                session.send("It's " + temp + " degrees celsius in " + city_name);
        });
    }
]); 
 
//Default Welcome Intent, (eg: when user says hi)
intents.matches('Default Welcome Intent',function(session){
	session.send("Hello! I'm the weather bot");
});
//Default intent, when bot doesn't understand user query.
intents.onDefault(function(session){ 
	session.send("Sorry...can you please rephrase?"); 
});
//Goodbye intent(eg: when user says bye)	    
intents.matches('EndChat',function(session){
	session.send("Goodbye!");
});
	    
//Above code can be extended by adding more intents in Dialogflow/LUIS and coding relevant responses.
