import gm from 'gm';
import request from 'request';


const serveImage = (callback) => {
  const im = gm.subClass({ imageMagick: true });

  const url = 'http://jonvilma.com/images/rainbow-8.jpg';

  im(request(url))
    .resize(700, 700)
    .font('Impact', 150)
    .stroke('black', 4)
    .fill('white')
    .drawText(35, 240, 'Hell Yeah')
    .stream((err, stdout) => {
      callback(stdout);
    });
};

export default serveImage;
