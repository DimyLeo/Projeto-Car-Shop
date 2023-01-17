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

  public async getAllService() {
    const bikeModel = new MotorcycleModel(); 
    const bikes = await bikeModel.findAll();
    return bikes.map((index) => MotorcycleService.createBikeDomain(index));
  }

  public async getByIdService(id: string) {
    const bikeModel = new MotorcycleModel(); 
    const bike = await bikeModel.findOne(id);
    if (bike) {
      const newCar = MotorcycleService.createBikeDomain(bike);
      return newCar;
    }
    return bike;
  }
}