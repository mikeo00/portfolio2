const cors = require('cors');
const express = require('express');
const path = require('path');
const languageRouter = require('./src/router/languageRouter.cjs');
const frameworkRouter = require('./src/router/frameworkRouter.cjs');
const projectRouter = require('./src/router/projectRouter.cjs');

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4000',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins
}));

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use(express.json());
app.use(express.static('dist'));

app.use('/api/languages', languageRouter);
app.use('/api/frameworks', frameworkRouter);
app.use('/api/projects', projectRouter);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`server is listening on port ${PORT}`);
});

