const cors = require('cors');
const express = require('express');
const languageRouter = require('./src/router/languageRouter.cjs');
const frameworkRouter= require('./src/router/frameworkRouter.cjs')
const projectRouter= require('./src/router/projectRouter.cjs')

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors({
  origin:['http://localhost:5173','http://127.0.0.1:5173']
}))
app.use((req,res,next)=>{
    console.log(req.method,req.path)
    next()
})
app.use(express.json());
app.use('/languages', languageRouter);
app.use('/frameworks', frameworkRouter);
app.use('/projects', projectRouter);

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
