import config from '../config';

const fs = require('fs');
const { google } = require('googleapis');

export async function authorize(credentials) {
  const { OAuth2 } = google.auth;
  const TOKEN_PATH = `${__dirname}/../../${config.youtubeapi.cred_path}youtube-token.json`;
  const clientSecret = credentials.web.client_secret;
  const clientId = credentials.web.client_id;
  const redirectUrl = credentials.web.redirect_uris[0];
  const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);
  try {
    const token = await fs.promises.readFile(TOKEN_PATH);
    oauth2Client.credentials = JSON.parse(token);
    return oauth2Client;
  } catch (err) {
    return err;
  }
}
