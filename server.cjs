
const express = require('express');
const languageRouter = require('./src/router/languageRouter.cjs');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/languages', languageRouter);

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
