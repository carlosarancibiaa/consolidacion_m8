import User from './user.model.js';
import Bootcamp from './bootcamp.model.js';

//relacion n to m between user and bootcamp:

User.belongsToMany(Bootcamp, {
  as: 'bootcamps',
  through: 'usersBootcamps'
});

Bootcamp.belongsToMany(User, {
  as: 'users',
  through: 'usersBootcamps'
});