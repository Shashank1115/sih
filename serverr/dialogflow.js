const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const path = require('path');

// Set up Google Cloud credentials
const projectId = 'chatbot-ohow'; // Replace with your Dialogflow project ID
const sessionId =  uuid.v4();
const keyFilename = 'C:/Users/shash/Desktop/sih/serverr/key.json';
 // Update path accordingly

const sessionClient = new dialogflow.SessionsClient({ keyFilename });
const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

async function getResponseFromDialogflow(text) {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: text,
        languageCode: 'en-US',
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    return result.fulfillmentText;
  } catch (error) {
    console.error('ERROR:', error);
    throw error;
  }
}

module.exports = { getResponseFromDialogflow };
