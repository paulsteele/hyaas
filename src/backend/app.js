import express from 'express';

const server = express();

server.use('/', express.static('dist'));

server.get('/plaintext', (req, res) => {
  res.send('hell yeah');
});

server.listen(8080);
console.log('hyaas has started up');
