import IMotorcycle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

export default class Motorcycle extends Vehicle {
  private category: string;
  private engineCapacity: number;

  constructor(motorbike: IMotorcycle) {
    super(motorbike);
    this.category = motorbike.category;
    this.engineCapacity = motorbike.engineCapacity;
  }
}