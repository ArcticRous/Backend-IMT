import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';

const categoryService = new CategoryService();

export class CategoryController {
  async listarCategorias(req: Request, res: Response) {
    try {
      const categorias = await categoryService.listarCategorias();
      res.status(200).json({ ok: true, data: categorias });
    } catch (error) {
      res.status(500).json({ ok: false, message: 'Error al obtener categorías' });
    }
  }

  async crearCategoria(req: Request, res: Response) {
    try {
      const categoria = await categoryService.crearCategoria(req.body);
      console.log('Categoría creada:', categoria);
      res.status(201).json({ ok: true, data: categoria });
    } catch (error) {
      console.error('Error real:', error);
      res.status(400).json({ ok: false, message: 'Error al crear categoría' });
    }
  }

  async actualizarCategoria(req: Request, res: Response) {
    try {
      const idCat = Number(req.params.idCat);
      const categoria = await categoryService.actualizarCategoria(idCat, req.body);
      res.status(200).json({ ok: true, data: categoria });
    } catch (error) {
      res.status(400).json({ ok: false, message: 'Error al actualizar categoría' });
    }
  }
}