import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const bike: IMotorcycle = {
      id: this.req.body.id,
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    try {
      const newBike = await this.service.create(bike);
      return this.res.status(201).json(newBike);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll() {
    try {
      const motorcycle = await this.service.getAllService();
      return this.res.status(200).json(motorcycle);
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

      const motorcycle = await this.service.getByIdService(id);
      if (!motorcycle) {
        return this.res.status(404).json({ message: 'Motorcycle not found' });
      }

      return this.res.status(200).json(motorcycle);
    } catch (error) {
      this.next(error);
    }
  }
}

export default MotorcycleController;