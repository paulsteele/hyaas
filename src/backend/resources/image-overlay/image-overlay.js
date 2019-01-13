import gm from 'gm';
import request from 'request';

const DEFAULT_IMAGE = 'http://jonvilma.com/images/rainbow-8.jpg';

const serveImage = (requestUrl, callback) => {
  const imageMagick = gm.subClass({ imageMagick: true });

  const imageUrl = requestUrl || DEFAULT_IMAGE;

  const image = request(imageUrl);

  imageMagick(image)
    .resize(1500, 1500)
    .font('Impact', 220)
    .stroke('black', 4)
    .fill('white')
    .gravity('Center')
    .drawText(0, 0, 'Hell Yeah')
    .stream((err, stdout) => {
      callback(stdout);
    });
};

export default serveImage;
