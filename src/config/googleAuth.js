import { authorize } from '../utils/googleAuthUtils';
import config from './index';

const fs = require('fs');

export let AUTH_OBJ = null;
export async function getGAuth() {
  try {
    const jsonString = await fs.promises.readFile(
      `${__dirname}/../../${config.youtubeapi.cred_path}client_secret.json`
    );
    const parsedJson = JSON.parse(jsonString);
    AUTH_OBJ = await authorize(parsedJson);
  } catch (err) {
    return err;
  }
}
