interface CreateUserDTOProps {
  name: string;
  email: string;
  password: string;
}

class CreateUserDTO {
  public name: string;
  public email: string;
  public password: string;

  constructor({ name, email, password }: CreateUserDTOProps) {
    if (!email) throw new Error("Email obrigatório");
    if (password.length < 6) throw new Error("Senha muito curta");

    this.name = name;
    this.email = email; 
    this.password = password;
  }
}
export default CreateUserDTO;
