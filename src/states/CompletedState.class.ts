import { InspectionState } from "./InspectionState.interface";
import { Inspector } from "../mainclasses/Inspector.class";
import { Location } from "../mainclasses/Location.class";
import { AvailableState } from "./AvailableState.class";
import { InProgressState } from "./InProgressState.class";

/**
 * Estado Completado - El inspector ha finalizado una inspección
 */
export class CompletedState implements InspectionState {
  private lastLocation: Location;
  private startTime: Date;
  private endTime: Date;

  constructor(location: Location, startTime: Date, endTime: Date) {
    this.lastLocation = location;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  startInspection(inspector: Inspector, location: Location): string {
    // Cambiar al estado "En Progreso" para la nueva inspección
    inspector.setState(new InProgressState(location));
    return `Inspector ${inspector.name} ha iniciado nueva inspección en ${location.name}`;
  }

  finishInspection(inspector: Inspector): string {
    return `Inspector ${inspector.name} ya completó la inspección en ${this.lastLocation.name}. Use startInspection para comenzar una nueva.`;
  }

  getStateName(): string {
    return "Completado";
  }

  canStartInspection(): boolean {
    return true;
  }

  getLastInspectionReport(): {
    location: Location;
    startTime: Date;
    endTime: Date;
    duration: number; // en segundos
  } {
    const duration = Math.round((this.endTime.getTime() - this.startTime.getTime()) / 1000);
    return {
      location: this.lastLocation,
      startTime: this.startTime,
      endTime: this.endTime,
      duration
    };
  }

  /**
   * Resetear el inspector al estado disponible
   * @param inspector Inspector a resetear
   */
  resetToAvailable(inspector: Inspector): string {
    inspector.setState(new AvailableState());
    return `Inspector ${inspector.name} está ahora disponible para nuevas inspecciones`;
  }
}