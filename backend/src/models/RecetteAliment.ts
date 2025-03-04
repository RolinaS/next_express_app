import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { Recette } from './Recette';
import { Aliment } from './Aliment';

interface RecetteAlimentAttributes {
  id: number;
  recette_id: number;
  aliment_id: number;
  poids: number;
}

export class RecetteAliment extends Model<RecetteAlimentAttributes> implements RecetteAlimentAttributes {
  public id!: number;
  public recette_id!: number;
  public aliment_id!: number;
  public poids!: number;
}

RecetteAliment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    recette_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Recette,
        key: 'id',
      },
    },
    aliment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Aliment,
        key: 'id',
      },
    },
    poids: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'recettes_aliments',
    timestamps: false,
  }
);
