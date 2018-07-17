import express from 'express';
import api from './api/index';

const app = express();

const port = process.env.PORT || 8000;
const env = process.env.NODE_ENV;
const hmr = module.hot ? 'activated' : 'deactivated';

app.get('/', (req, res) => {
  res.status(200).json({
    message: `go to http://127.0.0.1:${port}/api for Grouve GraphQL API`,
  });
}).listen(port, () => {
  console.log('Welcome to Grouver GraphQL API');
  console.log(`For more info go to http://127.0.0.1:${port}/`);
  console.log('==========================================');
  console.log(`Port: ${port}`);
  console.log(`Environment: ${env}`);
  console.log(`Hot reload: ${hmr}`);

  app.use('/api', api);
});
