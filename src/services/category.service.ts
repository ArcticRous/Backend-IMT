import { Category } from '../models/category.model';

export class CategoryService {
  async listarCategorias() {
    return await Category.findAll();
  }

  async crearCategoria(data: { Nombre: string; Estado: number }) {
    return await Category.create({
      Nombre: data.Nombre,
      Estado: data.Estado,
    });
  }

  async actualizarCategoria(idCat: number, data: { Nombre?: string; Estado?: number }) {
    const categoria = await Category.findByPk(idCat);
    if (!categoria) throw new Error('Categoría no encontrada');
    await categoria.update(data);
    return categoria;
  }

}