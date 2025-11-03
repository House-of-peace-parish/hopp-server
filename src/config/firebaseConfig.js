require('dotenv').config();
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_CLIENT_AUTH_URI,
  token_uri: process.env.FIREBASE_CLIENT_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_CLIENT_AUTH_CERT_URI,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URI,
  universe_domain: process.env.FIREBASE_CLIENT_UNIVERSE_DOMAIN,
}

const app = initializeApp({
  credential: cert(serviceAccount),
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
});

// Export the storage instance
const storage = getStorage(app);
module.exports = { storage };