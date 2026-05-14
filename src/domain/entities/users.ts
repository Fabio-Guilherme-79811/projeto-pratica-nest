interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
}

class User {
  public id?: string;
  public name: string;
  public email: string;
  public password: string;
  public createdAt: Date;

  constructor({ id, name, email, password, createdAt }: UserProps) {
    if (!email.includes("@")) throw new Error("Email inválido");
    if (!name || name.length < 2) throw new Error("Nome muito curto");

    this.id = id;
    this.name = name.trim();
    this.email = email.toLowerCase();
    this.password = password;
    this.createdAt = createdAt || new Date();
  }

  isAdmin(): boolean {
    return this.email.endsWith("@empresa.com");
  }
}

export default User;
