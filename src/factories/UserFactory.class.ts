import { User } from "../abstract/User.class";
import { Admin } from "../mainclasses/Admin.class";
import { Inspector } from "../mainclasses/Inspector.class";

export enum UserType {
  ADMIN = "admin",
  INSPECTOR = "inspector"
}

export class UserFactory {
  /**
   * Factory Method para crear usuarios según el tipo especificado
   * @param type Tipo de usuario a crear
   * @param name Nombre del usuario
   * @param age Edad del usuario
   * @param email Email del usuario
   * @returns Instancia del usuario creado
   */
  public static createUser(type: UserType, name: string, age: number, email: string): User {
    switch (type) {
      case UserType.ADMIN:
        return new Admin(name, age, email);
      case UserType.INSPECTOR:
        return new Inspector(name, age, email);
      default:
        throw new Error(`Tipo de usuario no soportado: ${type}`);
    }
  }

  /**
   * Método de conveniencia para crear un administrador
   */
  public static createAdmin(name: string, age: number, email: string): Admin {
    return this.createUser(UserType.ADMIN, name, age, email) as Admin;
  }

  /**
   * Método de conveniencia para crear un inspector
   */
  public static createInspector(name: string, age: number, email: string): Inspector {
    return this.createUser(UserType.INSPECTOR, name, age, email) as Inspector;
  }
}