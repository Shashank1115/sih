const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const path = require('path');

// Path to your service account key file
const keyFilename = 'C:/Users/shash/Desktop/sih/serverr/key.json';
 // Update this path
const projectId = 'chatbot-ohow'; // Replace with your project ID

// Create a session client with explicit key file
const sessionClient = new dialogflow.SessionsClient({ keyFilename });

async function detectIntent() {
  // Generate a new unique session ID
  const sessionId = uuid.v4();
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: 'Hello', // The input query
        languageCode: 'en-US',
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent:');
    const result = responses[0].queryResult;
    console.log(`Query: ${result.queryText}`);
    console.log(`Response: ${result.fulfillmentText}`);
  } catch (err) {
    console.error('ERROR:', err);
  }
}

detectIntent();
