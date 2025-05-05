import express from 'express';
import * as fs from 'fs';
import cors from 'cors';
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.post('/api/updateUsers', cors(), (req, res) => {
  console.log('get req header is ')
  console.log(req.headers);
  console.log('body is ');
  console.log(req.body);
  const content = JSON.stringify(req.body);
  console.log('content is ');
  console.log(content);
  fs.writeFile('./app/data/data.json', content, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Failed to write file.');
    }
    res.status(200).send('aa File saved successfully.');
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
