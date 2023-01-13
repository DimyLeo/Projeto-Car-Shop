import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarModel from '../Models/CarModel';

export default class CarService {
  private static createCarDomain(car: ICar): Car {
    return new Car(car);
  }

  public async create(carInfo: ICar): Promise<Car> {
    const carModel = new CarModel(); 
    const createCar = await carModel.create(carInfo);
    const carDomain = CarService.createCarDomain(createCar);
    return carDomain;
  }
}