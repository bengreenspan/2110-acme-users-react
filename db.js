const { useReducer } = require('react');
const Sequelize = require('sequelize');
const { STRING, TEXT } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/sandreact');

const Sandwich = conn.define('sandwich', {
  name: STRING,
  ingredients: TEXT
}, {
    hooks: {
        beforeCreate: function(sandwich){
            if(!sandwich.ingredients){
                sandwich.ingredients = `${sandwich.name} doesnt have ingred`;
            }
        }
    }
}


)

Sandwich.createWithName = (name) => Sandwich.create({name});

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const [BuffaloChicken, Liverwurst, TurkeyClub] = await Promise.all(
    ['Buffalo Chicken Sandwich', 'Liverwurst Sandwich', 'Turkey Club'].map(Sandwich.createWithName)
  );
//   console.log(TurkeyClub.get());
};



module.exports = {
    models: {
        Sandwich
},
syncAndSeed
};

