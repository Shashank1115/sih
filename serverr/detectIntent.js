// Imports the Dialogflow client library
const dialogflow = require('@google-cloud/dialogflow');
const path = require('path');

// Path to your service account key file
const keyFilename = 'C:/Users/shash/Desktop/sih/serverr/key.json'; // Update with your service account key file path
const projectId = 'chatbot-ohow'; // Replace with your Dialogflow project ID

// Create a session client with the key file
const sessionClient = new dialogflow.SessionsClient({ keyFilename });

async function detectIntent() {
  const sessionId = 'test-session-id'; // You can use any session ID, or generate one
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

// Call the function
detectIntent();
