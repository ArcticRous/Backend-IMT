import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/database';

export class Category extends Model {
  public idCat!: number;
  public FechaRegistro!: Date;
  public Nombre!: string;
  public Estado!: number;
}

Category.init(
  {
    idCat: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    FechaRegistro: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'categories',
    timestamps: false,
  }
);