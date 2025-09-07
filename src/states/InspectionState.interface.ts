import { Inspector } from "../mainclasses/Inspector.class";
import { Location } from "../mainclasses/Location.class";

/**
 * Interfaz para el patrón State - Define el comportamiento según el estado de inspección
 */
export interface InspectionState {
  /**
   * Iniciar inspección en una ubicación
   * @param inspector Inspector que realiza la acción
   * @param location Ubicación a inspeccionar
   */
  startInspection(inspector: Inspector, location: Location): string;

  /**
   * Finalizar inspección actual
   * @param inspector Inspector que realiza la acción
   */
  finishInspection(inspector: Inspector): string;

  /**
   * Obtener el nombre del estado actual
   */
  getStateName(): string;

  /**
   * Verificar si puede iniciar una nueva inspección
   */
  canStartInspection(): boolean;
}