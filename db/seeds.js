const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');

const Wishlist = require('../models/wishlist');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase()
    .then(() => Wishlist.create([{
      listOwner: 'Jon Townsend',
      event: 'Birthday',
      date: '20190601',
      item: {image: 'https://media.manufactum.de/is/image/Manufactum/opengraph/italian-stainless-steel-kettle--20294_01.jpg', obtained: 'false'},
      listComplete: 'false'
    }, {
      listOwner: 'Santa Claus',
      event: 'Christams',
      date: '20191225',
      item: {image: 'https://cdn.shopify.com/s/files/1/1180/3866/products/NEW-FEDEX-SOCKS-2710v2_1500x.jpg?v=1495468418', obtained: 'false'},
      listComplete: 'false'
    }]))
    .then(wishlists => console.log(`${wishlists.length} wishlists created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
