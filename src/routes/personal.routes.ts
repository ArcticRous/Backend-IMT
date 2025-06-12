import { Router } from 'express';
import { PersonalController } from '../controllers/personal.controller';
const router = Router();
const personalController = new PersonalController();

router.get('/Personal', personalController.listarPersonal.bind(personalController));
router.get('/personal/buscar', personalController.buscarPorCorreo.bind(personalController));
export default router;