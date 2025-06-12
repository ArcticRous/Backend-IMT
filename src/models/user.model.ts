import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/database';

export class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public email!: string;
  public status!: number | null;
  public idPersonal!: number | null;
  public idRoles!: number | null; // <-- agregado
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },
    idPersonal: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idRoles: { 
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 2,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  }
);