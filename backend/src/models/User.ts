import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

interface UserAttributes {
  id: number;
  nom: string;
  prenom: string;
  mail: string;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public nom!: string;
  public prenom!: string;
  public mail!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: false,
  }
);
