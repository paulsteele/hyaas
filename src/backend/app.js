import express from 'express';

import serveImage from './resources/image-overlay/image-overlay';

const server = express();

server.use('/', express.static('dist'));

server.get('/plaintext', (req, res) => {
  res.send('hell yeah');
});

server.get('/image', (req, res) => {
  const callback = (stream) => {
    res.contentType('jpeg');
    stream.pipe(res);
  };

  serveImage(callback);
});

server.listen(8080);
console.log('hyaas has started up');
