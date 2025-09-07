import { Status } from "../enum/status.enum";

export class Location {
  name: string;
  coordinates: string;
  status: Status;
  constructor(name: string, coordinates: string, status?: Status) {
    this.name = name;
    this.coordinates = coordinates;
    this.status = status || Status.Active;
  }
}
