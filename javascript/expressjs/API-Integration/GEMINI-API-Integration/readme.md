# GEMINI API INTEGRATION WITH EXPRESSJS

This project is a simple Expressjs app which use the `GoogleGenerativeAI` module to prompt the Google GEMINI AI.

## GOOGLE GEMINI API KEY

To be able to prompt the Google GEMINI AI you will need an API key.
Click on the link below to get your own API key

[GET an API key from Google AI Studio](https://aistudio.google.com/app/apikey)

`NOTE`: You will need a Google account and you must be 18 years or above in order to access Google AI STUDIO.

## ADDING .env FILE

Make sure to add your .env file in this project directory
i.e `GEMINI-API-Integration/.env`.
Once you've created your .env file, add your API key
i.e `API_KEY=your api key`

## PROJECT INFORMATION

### Modules installed

1. Express
2. GoogleGenerativeAI
3. CORS
4. dotenv
5. nodemon

### Endpoints

#### `POST /chat`

This endpoint is used to prompt the Google GEMINI AI. It expects a JSON body with the following property:

- `prompt`: a string that is required which contains the user prompt.

Returns an object with the following properties:

- `prompt`: a string that contains the user prompt.
- `response`: a string that contains the result of the prompt.

## Running project

To run this project, follow these steps:

1. open this project directory i.e `javascript\expressjs\API-Integration\GEMINI-API-Integration` in your Terminal.
2. Install all required modules. Use the `npm i` command to install. Note once you have installed required modules, you don't have to install it again.
2. run `npm start`
