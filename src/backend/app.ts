import * as express from 'express';

import imageOverlay from './resources/image-overlay/image-overlay';

const server = express();

server.use('/', express.static('dist'));

server.get('/plaintext', (req, res) => {
  res.send('Hell Yeah');
});

server.get('/image', (req, res) => {
  const callback = (stream: NodeJS.ReadWriteStream) => {
    res.contentType('jpeg');
    stream.pipe(res);
  };

  const url = req.query.url ? req.query.url.toString() : undefined;

  imageOverlay(url, callback);
});

server.listen(8080);
console.log('hyaas has started up');
