import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const Bootcamp = sequelize.define(
  "bootcamps",
  {
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate:{
        notEmpty: true
      }
    },
    cue: {
      type: DataTypes.INTEGER,
      validate: {
        min: 5,
        max: 20,
        notEmpty: true
      },
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }
)

export default Bootcamp;