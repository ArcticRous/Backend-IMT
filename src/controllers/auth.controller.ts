import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { verifyToken } from "../utils/jwt";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public async listarUsuarios(req: Request, res: Response): Promise<void> {
    try {
      const usuarios = await this.authService.listarUsuarios();
      res.status(200).json({ ok: true, data: usuarios });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error al obtener usuarios";
      res.status(500).json({ ok: false, message });
    }
  }

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.authService.register(req.body);
      res.status(201).json({ ok: true, data: user });
    } catch (error) {
      const message = error instanceof Error ? error.message : "An error occurred";
      res.status(400).json({ ok: false, message });
    }
  }

  public async editarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const usuarioActualizado = await this.authService.editarUsuario(id, req.body);
      res.status(200).json({ ok: true, data: usuarioActualizado });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error al editar usuario";
      res.status(400).json({ ok: false, message });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { token, user } = await this.authService.login(req.body);
      res.status(200).json({ ok: true, token, user });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unauthorized";
      res.status(401).json({ ok: false, message });
    }
  }

  public validarToken(req: Request, res: Response) {
    const token = req.query.token as string;
    if (!token) {
      return res.status(400).json({ ok: false, valid: false, message: "Token requerido" });
    }
    try {
      const payload = verifyToken(token);
      return res.status(200).json({ ok: true, valid: true, payload });
    } catch (error) {
      return res.status(401).json({ ok: false, valid: false, message: "Token inválido" });
    }
  }

  public async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const { correo } = req.body;
      await this.authService.forgotPassword(correo);
      res.status(200).json({
        ok: true,
        message: "Si el correo existe, se ha enviado un enlace para restablecer la contraseña.",
      });
    } catch (error) {
      res.status(200).json({
        ok: false,
        message: "Si el correo existe, se ha enviado un enlace para restablecer la contraseña.",
      });
    }
  }

  public async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { token, nuevaClave } = req.body;
      await this.authService.resetPassword(token, nuevaClave);
      res.status(200).json({ ok: true, message: "Contraseña actualizada correctamente." });
    } catch (error) {
      res.status(400).json({ ok: false, message: "Token inválido o expirado." });
    }
  }
}