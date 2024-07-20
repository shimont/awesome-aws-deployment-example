import express, { Express, Request, Response } from 'express';
import hn from './hn';

const app: Express = express();

app.get('/', async (req: Request, res: Response) => {
  console.log(`${(new Date().toISOString())} - Fetching top HN stories`)
  let hnc = new hn();
  let stories = await hnc.getStories();
  let plain = await hnc.getPLAINresponse(stories);
  res.send(plain);
});

app.get('/json', async (req: Request, res: Response) => {
  console.log(`${(new Date().toISOString())} - Fetching JSON top HN stories`)
  let hnc = new hn();
  let stories = await hnc.getStories();
  let json = await hnc.getJSONresponse(stories);
  res.send(json);
})

app.get('/health', async (req: Request, res: Response) => {
  console.log(`${(new Date().toISOString())} - Health check`)
  res.send('OK');
})

app.listen(8000, () => {
  console.log('Server is running on port 8000');
})