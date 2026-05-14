import User from "src/domain/entities/users";
import IUserRepository from "src/domain/repositories/I-user-repositories";


interface Hasher {
    hash(password: string): Promise<string>;
}

interface CreateUserRequest { 
    name:string;
    email:string;
    password:string;
}

class CreateUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private hasher: Hasher,
    ){}
    async execute({
        name,
        email,
        password,
    }: CreateUserRequest): Promise<User> {

        const existingEmail = await this.userRepository.findByEmail(email);
        if (existingEmail) throw new Error("Email já cadastrado");

        const hashedPassword = await this.hasher.hash(password);

        const user = new User({
            name,
            email,
            password: hashedPassword,
         });
        
        return this.userRepository.save(user);
    }
}

export default CreateUserUseCase;
