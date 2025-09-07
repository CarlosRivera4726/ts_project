import { LocalDatabase } from "../db/local.database";

export abstract class User {
  name: string;
  age: number;
  email: string;
  constructor(name: string, age: number, email: string) {
    this.name = name;
    this.age = age;
    this.email = email;
    LocalDatabase.CreateUser(this);
  }
}
