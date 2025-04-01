import {FusionAuthClient} from '@fusionauth/typescript-client';
import 'dotenv/config'

const FUSIONAUTH_API_KEY = process.env.FUSIONAUTH_API_KEY;
const BASE_URL = process.env.BASE_URL;
const RECIPIENT_ENTITY_ID = process.env.RECIPIENT_ENTITY_ID;
const RECIPIENT_ENTITY_SECRET = process.env.RECIPIENT_ENTITY_SECRET;
const TARGET_ENTITY_ID = process.env.TARGET_ENTITY_ID;
const PERMISSION = 'news';
const INVALID_PERMISSION = 'weather';

const client = new FusionAuthClient(FUSIONAUTH_API_KEY, BASE_URL);

function buildScope(targetEntityId, permissionString) {
  return 'target-entity:'+targetEntityId+':'+permissionString;
}

async function requestAccessTokenSuccess() {
  let access_token = null;
  try {
    const response = await client.clientCredentialsGrant(RECIPIENT_ENTITY_ID, RECIPIENT_ENTITY_SECRET, buildScope(TARGET_ENTITY_ID,PERMISSION)); 
    access_token = response.response.access_token;
  } catch (error) {
    console.error('Error getting access token:', JSON.stringify(error));
  }
  return access_token;
}

async function requestAccessTokenFailure() {
  let access_token = null;
  try {
    const response = await client.clientCredentialsGrant(RECIPIENT_ENTITY_ID, RECIPIENT_ENTITY_SECRET, buildScope(TARGET_ENTITY_ID,INVALID_PERMISSION)); 
    access_token = response.response.access_token;
  } catch (error) {
    console.error('Error getting access token:', JSON.stringify(error));
  }
  return access_token;
}

(async () => {
  let access_token = await requestAccessTokenSuccess();
  console.log(access_token);
  access_token = await requestAccessTokenFailure();
  console.log(access_token);
})();


