import { User } from "../models/user.model";
import { generateToken, verifyToken } from "../utils/jwt";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export class AuthService {
  async register(userData: {
    nombre: string;
    correo: string;
    clave: string;
    idPersonal?: number | null;
    idRoles?: number | null;
  }) {
    const existingUser = await User.findOne({
      where: { email: userData.correo },
    });
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(userData.clave, 10);

    const user = await User.create({
      username: userData.nombre,
      email: userData.correo,
      password: hashedPassword,
      idPersonal: userData.idPersonal ?? null,
      idRoles: userData.idRoles ?? undefined, // undefined para que use el default del modelo
    });

    return user;
  }

  async editarUsuario(
    id: number,
    data: Partial<{
      username: string;
      email: string;
      password: string;
      status: number | null;
      idPersonal: number | null;
      idRoles: number | null;
    }>
  ) {
    // Si se va a actualizar la contraseña, hashearla
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    const usuario = await User.findByPk(id);
    if (!usuario) throw new Error("Usuario no encontrado");
    await usuario.update(data);
    return usuario;
  }
  async login({ correo, clave }: { correo: string; clave: string }) {
    const user = await User.findOne({ where: { email: correo } });
    if (!user) throw new Error("valid credentials");
    const valid = await bcrypt.compare(clave, user.password);
    if (!valid) throw new Error("Invalid credentials");
    const token = generateToken({ id: user.id, email: user.email });
    return { token, user };
  }

  async validateToken(token: string) {
    return verifyToken(token);
  }

  async listarUsuarios() {
    return await User.findAll();
  }

  async forgotPassword(correo: string) {
    const user = await User.findOne({ where: { email: correo } });
    if (!user) return; // No revelar si existe o no
    // Genera un token con expiración de 15 minutos
    const token = generateToken({ id: user.id, email: user.email }, "15m");
    const transporter = nodemailer.createTransport({
      host: "smtp.imt.mx",
      port: 587,
      auth: {
        user: "sau@imt.mx",
        pass: "nt6s1R#L0vWhipte5",
      },
    });
    const resetUrl = `http://localhost:4200/reset-password?token=${token}`;
    await transporter.sendMail({
      to: user.email,
      subject: "Recupera tu contraseña",
      html: `<p>Haz clic en el siguiente enlace parcha restablecer tu contraseña (válido por 15 minutos):</p>
             <a href="${resetUrl}">${resetUrl}</a>`,
    });
  }
  async resetPassword(token: string, nuevaClave: string) {
    let payload: any;
    try {
      payload = verifyToken(token) as { id: number; email: string };
    } catch {
      throw new Error("Token inválido o expirado");
    }
    const user = await User.findByPk(payload.id);
    if (!user) throw new Error("Usuario no encontrado");
    user.password = await bcrypt.hash(nuevaClave, 10);
    await user.save();
  }
}
