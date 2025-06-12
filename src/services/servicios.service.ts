import { Servicio } from '../models/servicios.model';
import { Op, literal } from 'sequelize';


function toSqlDatetime(date: Date) {
  // Devuelve 'YYYY-MM-DD HH:mm:ss.SSS'
  return date.toISOString().slice(0, 23).replace('T', ' ');
}

export class ServicioService {
  async crearServicio(data: {
    idPersonal: number;
    Problema: string;
    idCategoria: number;
    idUser: number;
    solucion?: string;
  }) {
    return await Servicio.create({
      ...data,
      idEstado: 3,
      FechaCierre: null,
      idCalificacion: null
    });
  }
  async listarServicios() {
    return await Servicio.findAll();
  }

  // Editar un servicio por IdRegistro
  async editarServicio(id: number, data: Partial<Servicio>) {
    const servicio = await Servicio.findByPk(id);
    if (!servicio) throw new Error('Servicio no encontrado');
    await servicio.update(data);
    return servicio;
  }
 // Se elistan los servicios por usuario en el mes actual 
 async listarServiciosPorUsuario(idUser: number) {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

  const start = toSqlDatetime(startOfMonth); // 'YYYY-MM-DD HH:mm:ss.SSS'
  const end = toSqlDatetime(endOfMonth);

  return await Servicio.findAll({
    where: {
      idUser,
      [Op.and]: [
        literal(`FechaRegistro BETWEEN '${start}' AND '${end}'`)
      ]
    }
  });
}
}