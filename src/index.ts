import { LocalDatabase } from "./db/local.database";
import { Admin } from "./mainclasses/Admin.class";
import { Inspector } from "./mainclasses/Inspector.class";
import { Location } from "./mainclasses/Location.class";

function main(): void {
  const admin = new Admin("Carlos", 25, "carlos@ejemplo.com");
  LocalDatabase.CreateAdmin(admin);
  const location = new Location("Ubicación 1", "Descripción 1");
  LocalDatabase.CreateLocation(location);
  const locations = admin.obtenerUbicaciones();
  console.log(locations);
  const inspector = new Inspector("Carlos", 25, "carlos@ejemplo.com");
  LocalDatabase.CreateInspector(inspector);
  const users = LocalDatabase.GetUsers();

  console.log(users);
}

// Ejecutar la función principal
main();
