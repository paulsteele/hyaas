import * as gm from 'gm';
import * as request from 'request';
import * as fs from 'fs';

const DEFAULT_IMAGE = 'assets/default-image.jpg';

const serveImage = (requestUrl: string, callback: Function) => {
  const imageMagick = gm.subClass({ imageMagick: true });

  let image : any;

  if (requestUrl) {
    image = request(requestUrl);
  } else {
    image = fs.readFileSync(DEFAULT_IMAGE);
  }

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
