import { User } from "../abstract/User.class";
import { Admin } from "../mainclasses/Admin.class";
import { Inspector } from "../mainclasses/Inspector.class";
import { Location } from "../mainclasses/Location.class";

export class LocalDatabase {
  private static instance: LocalDatabase;
  private static locations: Location[] = [];
  private static users: User[] = [];
  private static admins: Admin[] = [];
  private static inspectors: Inspector[] = [];

  private constructor() {}

  public static getInstance(): LocalDatabase {
    if (!LocalDatabase.instance) {
      LocalDatabase.instance = new LocalDatabase();
    }
    return LocalDatabase.instance;
  }

  public static CreateAdmin(admin: Admin) {
    LocalDatabase.admins.push(admin);
  }

  public static CreateInspector(inspector: Inspector) {
    LocalDatabase.inspectors.push(inspector);
  }

  public static CreateLocation(location: Location) {
    LocalDatabase.locations.push(location);
  }

  public static CreateUser(user: User) {
    LocalDatabase.users.push(user);
  }

  public static GetLocations() {
    return LocalDatabase.locations;
  }

  public static GetUsers() {
    return LocalDatabase.users;
  }

  public static GetAdmins() {
    return LocalDatabase.admins;
  }

  public static GetInspectors() {
    return LocalDatabase.inspectors;
  }
}
