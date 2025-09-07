import { User } from "../abstract/User.class";
import { LocalDatabase } from "../db/local.database";
import { Location } from "./Location.class";

export class Admin extends User {
  name: string;
  age: number;
  email: string;
  constructor(name: string, age: number, email: string) {
    super(name, age, email);
    this.name = name;
    this.age = age;
    this.email = email;
  }

  public createLocation(location: Location) {
    LocalDatabase.CreateLocation(location);
  }

  public obtenerUbicaciones(): Location[] {
    return LocalDatabase.GetLocations();
  }
}
