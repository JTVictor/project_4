const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wishlists';
const port = process.env.PORT || 4000;
const secret = 'Yhg^7/kLs23';
const googleKey = process.env.GOOGLE_VISION_API_KEY;

module.exports = { dbURI, port, secret, googleKey };
