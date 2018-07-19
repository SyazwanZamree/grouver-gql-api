import express from 'express';
import mongoose from 'mongoose';
import gqlserver from './graphql/index';

const api = new express.Router();
const port = process.env.PORT || 8000;
const db = 'mongodb://localhost/test';

api.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Grouver Graphql API',
    gqlserver: `go to http://127.0.0.1:${port}/api/gqlserver to access Grouve GraphQL API server`,
    owner: 'Syazwan Zamree',
    author: 'Syazwan Zamree',
  });

  mongoose.Promise = Promise;
  mongoose.connect(db);
  api.use('/gqlserver', gqlserver.express);
});

export default api;
