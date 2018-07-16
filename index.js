var request = require('request');
var builder = require('botbuilder'); 
var apiairecognizer = require('api-ai-recognizer');
var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector); 
var recognizer = new apiairecognizer("62dfd852831a47e7ab0630a6e231673e");

var intents = new builder.IntentDialog({
         recognizers: [recognizer]
});

bot.dialog('/',intents);

intents.matches('findWeather',[
    function(session,args){
        var city = builder.EntityRecognizer.findEntity(args.entities,'cities');
        if (city){
            var city_name = city.entity;
            var url = "http://api.apixu.com/v1/current.json?key=e3480d7c809340a5b0f52606181607&q=" + city_name;
            request(url,function(error,response,body){
                body = JSON.parse(body);
                temp = body.current.temp_c;
                session.send("It's " + temp + " degrees celsius in " + city_name);
            });
        }else{
            builder.Prompts.text(session, 'Which city do you want the weather for?');
        }
    },
    function(session,results){
        var city_name = results.response;
        var url = "http://api.apixu.com/v1/current.json?key=e3480d7c809340a5b0f52606181607&q=" + city_name;
            request(url,function(error,response,body){
                body = JSON.parse(body);
                temp = body.current.temp_c;
                session.send("It's " + temp + " degrees celsius in " + city_name);
        });
    }
]); 
 

intents.matches('Default Welcome Intent',function(session){
	session.send("Hello! I'm the weather bot");
});

intents.onDefault(function(session){ 
	session.send("Sorry...can you please rephrase?"); 
});