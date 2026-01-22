import { UserService } from "../services/user.service";
import { hashPassword, comparePassword } from "../utils/bcrypt.util";
import { signToken } from "../utils/jwt.util";

export class AuthService {
  private service = new UserService();

  async register(email: string, password: string) {
    const hashed = await hashPassword(password);
    const user = await this.service.create({
      email,
      password: hashed,
      role: "USER",
    });
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.service.findByEmail(email);
    if (!user) throw new Error("User not found");

    const valid = await comparePassword(password, user.password);
    if (!valid) throw new Error("Invalid password");

    return signToken({ id: user.id, role: user.role });
  }
}
