import { Personal } from '../models/personal.model';

export class PersonalService {
  async listarPersonal() {
    return await Personal.findAll();
  }

  async buscarPorCorreo(correo: string) {
    return await Personal.findOne({ where: { correo } });
  }
}