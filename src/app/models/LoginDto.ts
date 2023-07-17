import { Employee } from "./Employee";
import { GenericObject } from "./GenericObject";

export class LoginDto extends GenericObject {
  Name: string;
  Username: string;
  Password: string;
  Role: string;
  ViewConfidentialData: number;
  Employee: Employee;
}
