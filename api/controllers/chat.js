const { google } = require('googleapis');
const { promisify } = require('util');
const { default: fetch } = require('node-fetch');

// Setting up authentication for firebase database
const serviceAccount = require('../config/fantasy-cc6ec-firebase-adminsdk-6jubb-7c6a551713.json');
const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/firebase.database',
];
const jwtClient = new google.auth.JWT(
  serviceAccount.client_email,
  null,
  serviceAccount.private_key,
  scopes
);

const getGoogleApiToken = async () => {
  return promisify((callback) => jwtClient.authorize(callback))();
};

// @desc Adds chat message to message board
// @route POST /MessageBoard/
// access Public
exports.addChat = async (req, res) => {
  try {
    const date = req.body.date;
    const time = req.body.time;
    const url = `https://fantasy-cc6ec-default-rtdb.firebaseio.com/data/messageboard/${date}/${time}.json`;

    const token = await getGoogleApiToken();
    const resFirebase = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.access_token}`,
      },
      body: JSON.stringify(req.body),
    });
    const status = resFirebase.status;
    console.log('Firebase put request status ', status);

    return res.status(status).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
};
