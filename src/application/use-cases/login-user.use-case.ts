import User from "src/domain/entities/users";
import IUserRepository from "src/domain/repositories/I-user-repositories";

interface Hasher {
  compare(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

interface TokenService {
  generate(payload: object): string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

class LoginUser {
  constructor(
    private userRepository: IUserRepository,
    private hasher: Hasher,
    private tokenService: TokenService,
  ) {}

  async execute({
    email,
    password,
  }: LoginRequest): Promise<LoginResponse> {
    // 1. Busca usuário
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new Error("Credenciais inválidas");

    // 2. Compara senhas
    const valid = await this.hasher.compare(password, user.password);

    if (!valid) throw new Error("Credenciais inválidas");

    // 3. Gera token JWT
    const token = this.tokenService.generate({
      id: user.id,
      email: user.email,
    });

    return { user, token };
  }
}
export default LoginUser;
