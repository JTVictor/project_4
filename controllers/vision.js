const { googleKey } = require('../config/environment');
const rp = require('request-promise');

function getVisionPic(req, res, next) {

  const request = {
    requests: [
      {
        image: { content: req.body.image },
        features: [{ type: 'LABEL_DETECTION' }]
      }
    ]
  };

  rp({
    method: 'POST',
    url: `https://vision.googleapis.com/v1/images:annotate?key=${googleKey}`,
    body: request,
    json: true
  })
    .then(response => res.json(response.responses[0].labelAnnotations))
    .catch(next);
}


module.exports = {
  getVisionPic
};
