import ICar from '../Interfaces/ICar';

export default class Car {
  protected id: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status: boolean | undefined;
  protected buyValue: number;
  private doorsQty: number;
  private seatsQty: number;

  constructor(carInfo: ICar) {
    this.id = carInfo.id;
    this.model = carInfo.model;
    this.year = carInfo.year;
    this.color = carInfo.color;
    this.status = carInfo.status;
    this.buyValue = carInfo.buyValue;
    this.doorsQty = carInfo.doorsQty;
    this.seatsQty = carInfo.seatsQty;
  }
}