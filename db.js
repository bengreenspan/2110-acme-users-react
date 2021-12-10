const Sequelize = require('sequelize');
const { STRING, TEXT } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/sandreact');

const Sandwich = conn.define('sandwich', {
  name: STRING,
  ingredients: TEXT
}
)

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  await Promise.all([
    Sandwich.create({ name: 'Buffalo Chicken Sandwich', ingredients: 'The Buffalo Chicken Sandwich, Best ordered at a deli counter on a with light red onion, blue cheese crumble. Ingredients: Bread, Chicken, Blue Cheese, Lettuce, Tomato, Onion, Buffalo Sauce'}),
    Sandwich.create({ name: 'Liverwurst Sandwich', ingredients: 'The Liverwurst Sandwich, Saucisse de foie de porc. Find it at McSorley\'s or Schaller & Weber. For sophisticated palates only. I think. Ingredients: Bread, Liverwurst, Onion, Mustard'}),
    Sandwich.create({ name: 'Turkey Club', ingredients: 'The Turkey Club, Some people opine that Club is an acronym for Chicken, Lettuce Under Bread. Ingredients: Bread, Turkey, Bacon, Lettuce, Tomato, Mayo'})
])
     
};



module.exports = {
    models: {
        Sandwich
},
syncAndSeed
};

