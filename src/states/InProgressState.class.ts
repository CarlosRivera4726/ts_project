import { InspectionState } from "./InspectionState.interface";
import { Inspector } from "../mainclasses/Inspector.class";
import { Location } from "../mainclasses/Location.class";
import { CompletedState } from "./CompletedState.class";

/**
 * Estado En Progreso - El inspector está realizando una inspección
 */
export class InProgressState implements InspectionState {
  private currentLocation: Location;
  private startTime: Date;

  constructor(location: Location) {
    this.currentLocation = location;
    this.startTime = new Date();
  }

  startInspection(inspector: Inspector, location: Location): string {
    return `Inspector ${inspector.name} ya está realizando una inspección en ${this.currentLocation.name}. No puede iniciar otra.`;
  }

  finishInspection(inspector: Inspector): string {
    const endTime = new Date();
    const duration = Math.round(
      (endTime.getTime() - this.startTime.getTime()) / 1000
    ); // en segundos

    // Cambiar al estado "Completado"
    inspector.setState(
      new CompletedState(this.currentLocation, this.startTime, endTime)
    );

    return `Inspector ${inspector.name} ha finalizado la inspección en ${this.currentLocation.name}. Duración: ${duration} segundos`;
  }

  getStateName(): string {
    return "En Progreso";
  }

  canStartInspection(): boolean {
    return false;
  }

  getCurrentLocation(): Location {
    return this.currentLocation;
  }

  getStartTime(): Date {
    return this.startTime;
  }
}
