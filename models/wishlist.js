const mongoose = require('mongoose');
// const moment = require('moment');

const wishlistSchema = new mongoose.Schema({
  listOwner: String,
  event: String ,
  date: Number,
  items: [{
    image: String,
    label: String,
    obtained: Boolean
  }],
  listComplete: Boolean
});

// wishlistSchema.path('date')
//   .get(function formatDate(date) {
//     return moment(date).format('YYYY-MM-DD');
//   });

module.exports = mongoose.model('Wishlist', wishlistSchema);
