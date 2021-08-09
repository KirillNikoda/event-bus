const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  console.log('event emitted');
});

app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex');
  console.log(req.body);
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };

  axios.post('http://localhost:4005/events', {
    type: 'post_created',
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log('listening on port 4000');
});
