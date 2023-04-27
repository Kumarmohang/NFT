let fs = require('fs');
let readline = require('readline');
let { google } = require('googleapis');
const request = require('request');
let OAuth2 = google.auth.OAuth2;
const categoryIds = {
  Entertainment: 24,
  Education: 27,
  ScienceTechnology: 28,
  PeopleBlogs: 22,
};
// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/youtube-nodejs-quickstart.json
let SCOPES = [
  'https://www.googleapis.com/auth/youtube.upload',
  'https://www.googleapis.com/auth/plus.login',
  'https://www.googleapis.com/auth/youtube',
  'https://www.googleapis.com/auth/youtubepartner',
  'https://www.googleapis.com/auth/youtube.force-ssl',
];
let TOKEN_PATH = 'youtube-token.json';

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loanoding client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the YouTube API.
  authorize(JSON.parse(content), getChannel);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  //console.log(credentials);
  let clientSecret = credentials.web.client_secret;
  let clientId = credentials.web.client_id;
  let redirectUrl = credentials.web.redirect_uris[0];
  let oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);
  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function (err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}
function uploadVideo(auth, title, description, tags) {
  const service = google.youtube('v3');
  let fileStream;
  request.get(
    'http://13.233.6.74:8003/static/166ae365-fcce-414e-8834-7cb8e256f420',
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        fileStream = body;
      }
    }
  );
  service.videos.insert(
    {
      auth: auth,
      part: 'snippet,status',
      requestBody: {
        snippet: {
          title,
          description,
          tags,
          categoryId: categoryIds.PeopleBlogs,
          defaultLanguage: 'en',
          defaultAudioLanguage: 'en',
        },
        status: {
          privacyStatus: 'public',
        },
      },
      media: {
        body: fileStream,
      },
    },
    function (err, response) {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }
      console.log(response.data);

      console.log('Video uploaded. Uploading the thumbnail now.');
    }
  );
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  let authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', function (code) {
    rl.close();
    oauth2Client.getToken(code, function (err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  //   try {
  //     fs.mkdirSync(TOKEN_DIR);
  //   } catch (err) {
  //     if (err.code != 'EEXIST') {
  //       throw err;
  //     }
  //   }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) throw err;
    console.log('Token stored to ' + TOKEN_PATH);
  });
}

/**
 * Lists the names and IDs of up to 10 files.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function getChannel(auth) {
  //uploadVideo(auth,"1","1","test");
  let service = google.youtube('v3');
  service.channels.list(
    {
      auth: auth,
      part: 'snippet,contentDetails,statistics',
      forUsername: 'GoogleDevelopers',
    },
    function (err, response) {
      if (err) {
        console.log('err');
        console.log('The API returned an error: ' + err);
        return;
      }
      let channels = response.data.items;
      if (channels.length == 0) {
        console.log('No channel found.');
      } else {
        console.log(
          "This channel's ID is %s. Its title is '%s', and " +
            'it has %s views.',
          channels[0].id,
          channels[0].snippet.title,
          channels[0].statistics.viewCount
        );
      }
    }
  );
}
