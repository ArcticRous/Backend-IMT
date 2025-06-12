import { DataTypes, Model } from 'sequelize';
import { sequelizeIMT } from '../utils/database';

export class Personal extends Model {
  public id!: number;
  public nombre!: string;
  public ubicacion!: string;
  public personal!: string;
  public puesto!: string | null;
  public correo!: string;
  public fechalta!: Date;
  public observaciones!: string | null;
  public status!: number;
  public created_at!: Date;
  public updated_at!: Date;
  public idcoordinacion!: number;
  public mando!: number;
}
Personal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ubicacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    personal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    puesto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fechalta: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    observaciones: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    idcoordinacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mando: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeIMT, // Usa la misma conexión que User
    tableName: 'personal',
    timestamps: false, // O true si quieres que Sequelize maneje las fechas
  }
);