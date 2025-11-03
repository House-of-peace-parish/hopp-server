const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');
const serviceAccount = require('../../hopp-b07e0-firebase-adminsdk-fbsvc-66e8c70d5c.json')

const app = initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'hopp-b07e0.appspot.com', // Replace with your actual bucket name
});

// Export the storage instance
const storage = getStorage(app);
module.exports = { storage };