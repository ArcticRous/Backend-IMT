import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const authController = new AuthController();

router.post('/login', (req, res) => authController.login(req, res));
router.post('/Registrarse', (req, res) => authController.register(req, res));
router.get('/users', authController.listarUsuarios.bind(authController));
router.get('/ValidarToken', (req, res) => authController.validarToken(req, res));
router.put('/users/:id', (req, res) => authController.editarUsuario(req, res));
router.post('/forgot-password', (req, res) => authController.forgotPassword(req, res));
router.post('/reset-password', (req, res) => authController.resetPassword(req, res));

export default router;      