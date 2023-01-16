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

  public async getAllService() {
    const carModel = new CarModel(); 
    const cars = await carModel.findAll();
    return cars.map((index) => CarService.createCarDomain(index));
  }

  public async getByIdService(id: string) {
    const carModel = new CarModel(); 
    const car = await carModel.findOne(id);
    if (car) {
      const newCar = CarService.createCarDomain(car);
      return newCar;
    }
    return car;
  }
}