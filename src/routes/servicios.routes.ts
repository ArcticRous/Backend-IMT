import { Router } from 'express';
import { ServicioController } from '../controllers/servicios.controller';

const router = Router();
const servicioController = new ServicioController();

router.post('/servicio', servicioController.crearServicio.bind(servicioController));
router.get('/servicio', servicioController.listarServicios.bind(servicioController));
router.put('/servicio/:id', servicioController.editarServicio.bind(servicioController));
router.get('/servicio/usuario/:idUser', servicioController.listarServiciosPorUsuario.bind(servicioController));
export default router;