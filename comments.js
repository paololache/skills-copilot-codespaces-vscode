// Create web server
// Create an endpoint for a POST request to /comments
// It should accept JSON data from the request body
// It should append the data to the comments array
// It should return the added comment object with a 201 status code
// It should return a 400 status code if the request body is missing any of the required fields
// It should return a 400 status code if the request body contains any additional fields
// It should return a 400 status code if the request body contains any invalid values
// It should return a 400 status code if the request body is not JSON

const express = require('express');
const app = express();
const comments = require('./comments');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/comments', (req, res) => {
  const { username, comment } = req.body;

  if (!username || !comment) {
    res.status(400).send('Missing required fields');
  } else if (Object.keys(req.body).length > 2) {
    res.status(400).send('Additional fields not allowed');
  } else if (typeof username !== 'string' || typeof comment !== 'string') {
    res.status(400).send('Invalid field types');
  } else {
    const newComment = { username, comment };
    comments.push(newComment);
    res.status(201).json(newComment);
  }
});

app.listen(4001, () => {
  console.log('Server is listening on port 4001');
});


