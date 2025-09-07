import { InspectionState } from "./InspectionState.interface";
import { Inspector } from "../mainclasses/Inspector.class";
import { Location } from "../mainclasses/Location.class";
import { InProgressState } from "./InProgressState.class";

/**
 * Estado Disponible - El inspector está libre para iniciar inspecciones
 */
export class AvailableState implements InspectionState {
  startInspection(inspector: Inspector, location: Location): string {
    // Cambiar al estado "En Progreso"
    inspector.setState(new InProgressState(location));
    return `Inspector ${inspector.name} ha iniciado inspección en ${location.name}`;
  }

  finishInspection(inspector: Inspector): string {
    return `Inspector ${inspector.name} no tiene inspecciones activas para finalizar`;
  }

  getStateName(): string {
    return "Disponible";
  }

  canStartInspection(): boolean {
    return true;
  }
}
