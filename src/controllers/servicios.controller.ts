import { Request, Response } from 'express';
import { ServicioService } from '../services/servicios.service';

const servicioService = new ServicioService();

export class ServicioController {

  async crearServicio(req: Request, res: Response) {
    try {
      const nuevoServicio = await servicioService.crearServicio(req.body);
      res.status(201).json({ ok: true, data: nuevoServicio });
    } catch (error) {
      console.error(error);
      res.status(500).json({ ok: false, message: 'Error al crear el servicio' });
    }
  }

  async listarServicios(req: Request, res: Response) {
    try {
      const servicios = await servicioService.listarServicios();
      res.status(200).json({ ok: true, data: servicios });
    } catch (error) {
      console.error(error);
      res.status(500).json({ ok: false, message: 'Error al listar los servicios' });
    }
  }
  async listarServiciosPorUsuario(req: Request, res: Response) {
    try {
      const idUser = Number(req.params.idUser);
      const servicios = await servicioService.listarServiciosPorUsuario(idUser);
      res.status(200).json({ ok: true, data: servicios });
    } catch (error) {
      console.error(error);
      res.status(500).json({ ok: false, message: 'Error al listar los servicios del usuario' });
    }
  }
  async editarServicio(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const servicioActualizado = await servicioService.editarServicio(id, req.body);
      res.status(200).json({ ok: true, data: servicioActualizado });
    } catch (error) {
      console.error(error);
      res.status(500).json({ ok: false, message: 'Error al editar el servicio' });
    }
  }
}