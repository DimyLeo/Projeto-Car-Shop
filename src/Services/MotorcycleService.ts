import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleModel from '../Models/MotorcycleModel';

export default class MotorcycleService {
  private static createBikeDomain(bike: IMotorcycle): Motorcycle {
    return new Motorcycle(bike);
  }

  public async create(carInfo: IMotorcycle): Promise<Motorcycle> {
    const bikeModel = new MotorcycleModel(); 
    const createBike = await bikeModel.create(carInfo);
    const bikeDomain = MotorcycleService.createBikeDomain(createBike);
    return bikeDomain;
  }
}