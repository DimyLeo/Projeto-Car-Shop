import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const car: ICar = {
      id: this.req.body.id,
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    try {
      const newCar = await this.service.create(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll() {
    try {
      const cars = await this.service.getAllService();
      return this.res.status(200).json(cars);
    } catch (error) {
      this.next(error);
    }
  }

  public async getById() {
    try {
      const { id } = this.req.params;
      if (id.length !== 24) {
        return this.res.status(422).json({ message: 'Invalid mongo id' });
      }

      const car = await this.service.getByIdService(id);
      if (!car) {
        return this.res.status(404).json({ message: 'Car not found' });
      }

      return this.res.status(200).json(car);
    } catch (error) {
      this.next(error);
    }
  }

  public async update() {
    try {
      const { id } = this.req.params;
      if (id.length !== 24) {
        return this.res.status(422).json({ message: 'Invalid mongo id' });
      }

      const newCar = await this.service.updateService(id, this.req.body);
      if (!newCar) {
        return this.res.status(404).json({ message: 'Car not found' });
      }

      return this.res.status(200).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }
}

export default CarController;