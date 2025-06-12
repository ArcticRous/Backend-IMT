import { Request, Response } from 'express';
import { PersonalService } from '../services/personal.service';

const personalService = new PersonalService();

export class PersonalController {
  
  async listarPersonal( req: Request, res: Response) {
    try {
      const personal = await personalService.listarPersonal();
      res.status(200).json({ ok: true, data: personal });
    } catch (error) {
      console.error(error);
      res.status(500).json({ ok: false, message: 'Error al obtener Personal' });
    }
  }

  async buscarPorCorreo(req: Request, res: Response) {
    try {
      const correo = req.query.correo as string;
      if (!correo) {
        return res.status(400).json({ ok: false, message: 'Correo es requerido' });
      }
      const usuario = await personalService.buscarPorCorreo(correo);
      if (!usuario) {
        return res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
      }
      res.status(200).json({ ok: true, data: usuario });
    } catch (error) {
      console.error(error);
      res.status(500).json({ ok: false, message: 'Error al buscar usuario' });
    }
  }
}