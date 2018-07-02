import express from 'express';

const server = express();

server.get('/', (req, res) => {
  res.send('hell yeah');
});

server.listen(8080);
console.log('hyaas has started up');
