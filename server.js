const { syncAndSeed, models: { Sandwich } } = require('./db');

const express = require('express');
const app = express();
const path = require('path');


app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));



app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/sandwiches', async(req, res, next)=> {
  try {
    res.send(await Sandwich.findAll({
      attributes: {
        exclude: ['ingredients']
      }
    }));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/sandwiches/:id', async(req, res, next)=> {
  try {
    res.send(await Sandwich.findByPk(req.params.id));
  }
  catch(ex){
    next(ex);
  }
});

const init = async()=> {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 8000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
}

init();
