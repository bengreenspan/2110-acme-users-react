const express = require('express');
const app = express();
const path = require('path');
const faker = require('faker');

//TODO move to db folder
const Sequelize = require('sequelize');
const { DataTypes: { STRING, TEXT }} = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_db');

const User = conn.define('user', {
  name: STRING,
  bio: TEXT
});

User.addHook('beforeSave', (user)=> {
  if(!user.bio){
    user.bio = `${ user.name } is ${ faker.commerce.productAdjective()}. ${faker.lorem.paragraphs(3)}`
  }
});

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const names = ['moe', 'lucy', 'ethyl', 'larry'];
  const users = await Promise.all(names.map( name => User.create({ name })));
};

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/users', async(req, res, next)=> {
  try {
    res.send(await User.findAll({
      attributes: {
        exclude: ['bio']
      }
    }));
  }
  catch(ex){
    next(ex);
  }
});
app.get('/api/users/:id', async(req, res, next)=> {
  try {
    res.send(await User.findByPk(req.params.id));
  }
  catch(ex){
    next(ex);
  }
});

const init = async()=> {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
}

init();
