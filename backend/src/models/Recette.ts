import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { User } from './User';
import { Aliment } from './Aliment';

interface RecetteAttributes {
  id?: number; 
  user_id: number;
}

export class Recette extends Model<RecetteAttributes> implements RecetteAttributes {
  public id!: number;
  public user_id!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Recette.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'recettes',
    timestamps: false,
  }
);

// Définition des associations
Recette.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Recette, { foreignKey: 'user_id' });

// Association many-to-many avec Aliment via RecetteAliment
Recette.belongsToMany(Aliment, { 
  through: 'recettes_aliments',
  foreignKey: 'recette_id',
  otherKey: 'aliment_id',
  as: 'aliments'
});
Aliment.belongsToMany(Recette, {
  through: 'recettes_aliments',
  foreignKey: 'aliment_id',
  otherKey: 'recette_id',
  as: 'recettes'
});
