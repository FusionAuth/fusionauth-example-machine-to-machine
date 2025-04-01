import {FusionAuthClient} from '@fusionauth/typescript-client';
import 'dotenv/config'

const FUSIONAUTH_API_KEY = process.env.FUSIONAUTH_API_KEY;
const BASE_URL = process.env.BASE_URL;
const RECIPIENT_ENTITY_ID = process.env.RECIPIENT_ENTITY_ID;
const RECIPIENT_ENTITY_SECRET = process.env.RECIPIENT_ENTITY_SECRET;
const TARGET_ENTITY_ID = process.env.TARGET_ENTITY_ID;
const PERMISSION = 'news';

const client = new FusionAuthClient(FUSIONAUTH_API_KEY, BASE_URL);

async function requestAccessToken() {
  try {
    const response = await client.clientCredentialsGrant(RECIPIENT_ENTITY_ID, RECIPIENT_ENTITY_SECRET, PERMISSION); 
    console.log('response: ', response);
    console.log(response.response.access_token);
  } catch (error) {
    console.error('Error getting access token:', JSON.stringify(error));
  }
}

(async () => {
  await requestAccessToken();
})();


