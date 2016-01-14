var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.ENV_DB, 'root', 'password', {dialect: 'mysql'});

var User = sequelize.define('User', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: Sequelize.STRING, unique: true, notNull: true },
});

var HashtagUser = sequelize.define('hashtag_user', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: Sequelize.INTEGER, notNull: true },
  hashtag_id: { type: Sequelize.INTEGER, notNull: true },
});

var Hashtag = sequelize.define('Hashtag', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: Sequelize.STRING, unique: true , notNull: true}
});

var init = function() {
  Hashtag.belongsToMany(User, { through: 'hashtag_user', foreignKey: 'hashtag_id' });
  User.belongsToMany(Hashtag, { through: 'hashtag_user', foreignKey: 'user_id' });
  sequelize.sync();
};

// init();

module.exports = {
  User: User,
  Hashtag: Hashtag,
  HashtagUser: HashtagUser,
  init: init
};
