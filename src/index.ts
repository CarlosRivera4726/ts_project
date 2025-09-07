import { LocalDatabase } from "./db/local.database";
import { Admin } from "./mainclasses/Admin.class";
import { Inspector } from "./mainclasses/Inspector.class";
import { Location } from "./mainclasses/Location.class";
import { UserFactory, UserType } from "./factories/UserFactory.class";
import { AdminFacade } from "./facades/AdminFacade.class";
import { Status } from "./enum/status.enum";

function main(): void {
  console.log("=== Demostración de Patrones de Diseño ===");
  
  // 1. Patrón Factory Method
  console.log("\n1. Patrón Factory Method:");
  const admin = UserFactory.createAdmin("Carlos Admin", 30, "admin@ejemplo.com");
  const inspector = UserFactory.createInspector("Ana Inspector", 28, "inspector@ejemplo.com");
  console.log(`Admin creado: ${admin.name}`);
  console.log(`Inspector creado: ${inspector.name}`);
  
  // 2. Patrón Facade
  console.log("\n2. Patrón Facade:");
  const adminFacade = new AdminFacade("Luis Facade", 35, "facade@ejemplo.com");
  const setup = adminFacade.setupNewLocationWithInspector(
    "Centro Comercial", 
    "Lat: 10.123, Lng: -74.456",
    "María Inspector", 
    26, 
    "maria@ejemplo.com"
  );
  console.log(`Ubicación creada: ${setup.location.name}`);
  console.log(`Inspector asignado: ${setup.inspector.name}`);
  
  const report = adminFacade.getSystemReport();
  console.log("Reporte del sistema:", report);
  
  // 3. Patrón State
  console.log("\n3. Patrón State:");
  const location1 = new Location("Parque Central", "Lat: 10.456, Lng: -74.789");
  const location2 = new Location("Plaza Mayor", "Lat: 10.789, Lng: -74.123");
  
  console.log(inspector.getStateInfo()); // Estado inicial: Disponible
  
  // Iniciar primera inspección
  console.log(inspector.startInspection(location1));
  console.log(inspector.getStateInfo()); // Estado: En Progreso
  
  // Intentar iniciar otra inspección (no debería permitir)
  console.log(inspector.startInspection(location2));
  
  // Finalizar inspección
  setTimeout(() => {
    console.log(inspector.finishInspection());
    console.log(inspector.getStateInfo()); // Estado: Completado
    
    // Iniciar nueva inspección
    console.log(inspector.startInspection(location2));
    console.log(inspector.getStateInfo()); // Estado: En Progreso
  }, 1000);
  
  console.log("\n=== Fin de la demostración ===");
}

// Ejecutar la función principal
main();
