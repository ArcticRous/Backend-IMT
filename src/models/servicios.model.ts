import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/database";

export class Servicio extends Model {
  public IdRegistro!: number;
  public FechaRegistro!: Date;
  public idPersonal!: number;
  public Problema!: string;
  public idCategoria!: number;
  public idUser!: number;
  public solucion!: string | null;
  public FechaCierre!: Date | null;
  public idEstado!: number;
  public idCalificacion!: number | null;
}

Servicio.init(
  {
    IdRegistro: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    FechaRegistro: {
     type: DataTypes.DATE,
      allowNull: true,
    },
    idPersonal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Problema: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    idCategoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    solucion: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    FechaCierre: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    idEstado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 3,
    },
    idCalificacion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    tableName: "Servicio",
    timestamps: false,
  }
);
