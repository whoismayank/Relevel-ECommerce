/**
* This file will be used for the following purpose: 
*
* 1. Create the DB connection with the help of sequelize
* 2. Export all the functionalities of the model through the file. 
* 
* One of the advantages of using index.js file is, other file
* trying to import this file, just need to provide the
* module name.
*
*/
const env = process.env.NODE_ENV || 'development';
const config = require("../configs/db.config")[env];
const Sequelize = require("sequelize");

/**
 * Creating the db connection
 */

const seq = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        logging: false

    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = seq;
db.category = require('./category.model.js')(db.sequelize, Sequelize);
db.product = require('./product.model.js')(db.sequelize, Sequelize);
db.user = require('./user.model')(db.sequelize, Sequelize);
db.role = require('./role.model')(db.sequelize, Sequelize);


// Establish the relationship between categories and products
// single category can have multiple products
db.category.hasMany(db.product);


// Establish the relationship between roles and user
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
})

// Establish the relationship between user and roles
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId"
})



module.exports = db;