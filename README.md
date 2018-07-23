# WeatherBot
Bot gives real-time temperature updates for city entered by user.
Query should be of the form: "What's the weather in Mumbai" or "Mumbai weather". weather/climate should be mentioned in the query for intent to be recognized.

Installation requirements:
npm and node latest versions
Run the following commands from CLI/Powershell to install requirements:

npm init

npm install botbuilder api-ai-recognizer

npm install request

package.json updated, no need to change.

Driver code is present in index.js.
Run from Command line using:
node index.js

Microsoft Bot Framework is used, along with API AI recognizer built by Akshay Ganadini:
https://github.com/GanadiniAkshay/ApiAiRecognizer

Dialogflow used for mapping intents and entities to the query. To use the same make an account on Dialogflow, create a new agent and create and train the relevant intents for it. LUIS can also be used here, their GUI is almost the same.

Obtain the Client Access Token from Dialogflow (View All Agents --> Select Agent --> Client Access Token). This will be used in the code(indicated in index.js file). Similarly also obtain API key for the specific API being used, APIXU is being used in this case. 

City names have been hardcoded in Dialogflow for now. Same can be changed by using prebuilt entities in Dialogflow/LUIS (@sys.geo-city in this case for Dialogflow).

Code can easily be extended for other applications using Bot Framework and LUIS/Dialogflow.
For usage and syntax related queries, please refer to Azure Bot Service Documentation: https://docs.microsoft.com/en-us/azure/bot-service/?view=azure-bot-service-3.0

For any other queries please contact: keskarshreesh@gmail.com
