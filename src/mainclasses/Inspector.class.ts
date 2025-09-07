import { User } from "../abstract/User.class";

export class Inspector extends User {
  constructor(name: string, age: number, email: string) {
    super(name, age, email);
  }
}
