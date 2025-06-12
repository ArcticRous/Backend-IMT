import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';

const router = Router();
const categoryController = new CategoryController();

router.get('/Categoria/Lista', (req, res) => categoryController.listarCategorias(req, res));
router.post('/Categoria', (req, res) => categoryController.crearCategoria(req, res));
router.put('/Categoria/Editar/:idCat', (req, res) => categoryController.actualizarCategoria(req, res));

export default router;