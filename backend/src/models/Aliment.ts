import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

interface AlimentAttributes {
  id: number;
  nom: string;
  glucide: number;
  proteine: number;
  lipide: number;
  kcal: number;
}

export class Aliment extends Model<AlimentAttributes> implements AlimentAttributes {
  public id!: number;
  public nom!: string;
  public glucide!: number;
  public proteine!: number;
  public lipide!: number;
  public kcal!: number;
}

Aliment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    glucide: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    proteine: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    lipide: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    kcal: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'aliments',
    timestamps: false,
  }
);
