const express = require('express');
const app = express();
const port = 3100;
const got = require('got');

// TODO ts-node, typed response JSON
// TODO publish

interface NowPlayingResponse {
    artist: string;
    title: string;
    last_updated: string;
    songImageUrl: string;
    name: string;
    imageUrl: string;
}

// Export for use by other apps
const getNowPlaying = async (): Promise<NowPlayingResponse> => {
  const nowonairResponse = await got('https://radiobox2.omroep.nl/data/radiobox2/nowonair/2.json').json();
  const { artist, title, last_updated, songversion } = nowonairResponse.results[0].songfile;
  const songImageUrl = songversion && songversion.image && songversion.image[0].url ? songversion.image[0].url : '';
  const broadcastResponse = await got('https://radiobox2.omroep.nl/data/radiobox2/currentbroadcast/2.json').json();
  const { name, image } = broadcastResponse.results[0];
  const imageUrl = image && image.url ? image.url : '';
  return { artist, title, last_updated, songImageUrl, name, imageUrl };
}

const startServer = () => {
  app.get('/', (req, res) => res.sendStatus(404));

  app.get('/api/nowplaying/radio2', async (req, res) => {
      // TODO only if localhost or debug mode_
      res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      try {
        const response = await getNowPlaying();
        res.send(response);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    }
  );

  app.listen(port, () => console.log(`App listening on port ${port}!`));
}

startServer();

module.exports = {
  getNowPlaying
};
