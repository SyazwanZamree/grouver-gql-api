import express from 'express';

const api = new express.Router();

api.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Grouver Graphql API',
    owner: 'Syazwan Zamree',
    author: 'Syazwan Zamree',
  });
});

export default api;
