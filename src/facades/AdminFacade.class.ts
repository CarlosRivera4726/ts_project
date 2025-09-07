import { Admin } from "../mainclasses/Admin.class";
import { Inspector } from "../mainclasses/Inspector.class";
import { Location } from "../mainclasses/Location.class";
import { UserFactory, UserType } from "../factories/UserFactory.class";
import { Status } from "../enum/status.enum";
import { LocalDatabase } from "../db/local.database";

/**
 * Facade que simplifica las operaciones complejas del sistema
 * Proporciona una interfaz unificada para gestionar usuarios, ubicaciones e inspecciones
 */
export class AdminFacade {
  private admin: Admin;

  constructor(adminName: string, adminAge: number, adminEmail: string) {
    this.admin = UserFactory.createAdmin(adminName, adminAge, adminEmail);
  }

  /**
   * Operación compleja: Crear una nueva ubicación con inspector asignado
   * @param locationName Nombre de la ubicación
   * @param coordinates Coordenadas de la ubicación
   * @param inspectorName Nombre del inspector
   * @param inspectorAge Edad del inspector
   * @param inspectorEmail Email del inspector
   */
  public setupNewLocationWithInspector(
    locationName: string,
    coordinates: string,
    inspectorName: string,
    inspectorAge: number,
    inspectorEmail: string
  ): { location: Location; inspector: Inspector } {
    // Crear la ubicación
    const location = new Location(locationName, coordinates, Status.Active);
    this.admin.createLocation(location);

    // Crear el inspector
    const inspector = UserFactory.createInspector(inspectorName, inspectorAge, inspectorEmail);
    LocalDatabase.CreateInspector(inspector);

    return { location, inspector };
  }

  /**
   * Operación compleja: Obtener reporte completo del sistema
   */
  public getSystemReport(): {
    totalLocations: number;
    activeLocations: number;
    inactiveLocations: number;
    totalInspectors: number;
    totalAdmins: number;
  } {
    const locations = this.admin.obtenerUbicaciones();
    const activeLocations = locations.filter(loc => loc.status === Status.Active).length;
    const inactiveLocations = locations.filter(loc => loc.status === Status.Inactive).length;
    
    return {
      totalLocations: locations.length,
      activeLocations,
      inactiveLocations,
      totalInspectors: LocalDatabase.GetInspectors().length,
      totalAdmins: LocalDatabase.GetAdmins().length
    };
  }

  /**
   * Operación compleja: Activar/Desactivar múltiples ubicaciones
   * @param locationNames Nombres de las ubicaciones a cambiar
   * @param newStatus Nuevo estado para las ubicaciones
   */
  public bulkUpdateLocationStatus(locationNames: string[], newStatus: Status): Location[] {
    const locations = this.admin.obtenerUbicaciones();
    const updatedLocations: Location[] = [];

    locations.forEach(location => {
      if (locationNames.includes(location.name)) {
        location.status = newStatus;
        updatedLocations.push(location);
      }
    });

    return updatedLocations;
  }

  /**
   * Obtener el administrador actual
   */
  public getAdmin(): Admin {
    return this.admin;
  }
}