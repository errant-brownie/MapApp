var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.ENV_DB, 'root', 'password', {dialect: 'mysql'});

var User = sequelize.define('User', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: Sequelize.STRING, unique: true, notNull: true },
});

var ItemUser = sequelize.define('item_user', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: Sequelize.INTEGER, notNull: true },
  item_id: { type: Sequelize.INTEGER, notNull: true },
});

var Item = sequelize.define('Item', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: Sequelize.STRING, unique: true , notNull: true}
});

var init = function() {
  Item.belongsToMany(User, { through: 'item_user', foreignKey: 'item_id' });
  User.belongsToMany(Item, { through: 'item_user', foreignKey: 'user_id' });
  sequelize.sync();
};

init();

module.exports = {
  User: User,
  Item: Item,
  ItemUser: ItemUser,
  init: init
};
