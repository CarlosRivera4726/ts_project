import { User } from "../abstract/User.class";
import { InspectionState } from "../states/InspectionState.interface";
import { AvailableState } from "../states/AvailableState.class";
import { Location } from "./Location.class";

/**
 * Clase Inspector que implementa el patrón State para manejar estados de inspección
 */
export class Inspector extends User {
  private state: InspectionState;

  constructor(name: string, age: number, email: string) {
    super(name, age, email);
    this.state = new AvailableState(); // Estado inicial
  }

  /**
   * Cambiar el estado del inspector
   * @param state Nuevo estado
   */
  public setState(state: InspectionState): void {
    this.state = state;
  }

  /**
   * Obtener el estado actual
   */
  public getState(): InspectionState {
    return this.state;
  }

  /**
   * Iniciar inspección en una ubicación
   * @param location Ubicación a inspeccionar
   */
  public startInspection(location: Location): string {
    return this.state.startInspection(this, location);
  }

  /**
   * Finalizar inspección actual
   */
  public finishInspection(): string {
    return this.state.finishInspection(this);
  }

  /**
   * Obtener información del estado actual
   */
  public getStateInfo(): string {
    return `Inspector ${this.name} - Estado: ${this.state.getStateName()}`;
  }

  /**
   * Verificar si puede iniciar una nueva inspección
   */
  public canStartInspection(): boolean {
    return this.state.canStartInspection();
  }
}
