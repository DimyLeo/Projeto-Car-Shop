import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';
import cars from '../Mocks/CarMocks';

describe('Testa a camada CarService', function () {
  it('Testa se o veiculo é cadastrado', async function () {
    const carBody: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };
    const carReturn: Car = new Car({
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
      id: '63319d80feb9f483ee823ac5',
    });
    sinon.stub(Model, 'create').resolves(carReturn);

    const service = new CarService();
    const result = await service.create(carBody);

    expect(result).to.be.deep.equal(carReturn);
    sinon.restore();
  });

  it('Testa se retorna um carro por id', async function () {
    const carReturn: Car = new Car(cars[0]);

    sinon.stub(Model, 'findOne').resolves(carReturn);

    const service = new CarService();
    const carById = await service.getByIdService('63c359e49375e3a47459a92d');

    expect(carById).to.be.deep.equal(carReturn);
    sinon.reset();
  });

  it('Testa se retorna todos os carros', async function () {
    const carsReturn: Car[] = cars.map((car) => {
      const createCars = (carObj: ICar) => new Car(carObj);
      return createCars(car);
    });
    const carReturn1: Car = new Car(cars[0]);
    const carReturn2: Car = new Car(cars[2]);
    const carReturn3: Car = new Car(cars[4]);

    sinon.stub(Model, 'find').resolves(carsReturn);

    const service = new CarService();
    const carsResult = await service.getAllService();

    expect(JSON.stringify(carsResult)).include(JSON.stringify(carReturn1));
    expect(JSON.stringify(carsResult)).include(JSON.stringify(carReturn2));
    expect(JSON.stringify(carsResult)).include(JSON.stringify(carReturn3));
    sinon.restore();
  });

  it('Testa se retorna um erro com um id de carro que não existe', async function () {
    sinon.stub(Model, 'findOne').resolves({});

    try {
      const service = new CarService();
      await service.getByIdService('63c359e49375e3a47459a92e');
    } catch (error) {
      expect(JSON.parse((error as Error).message).message).to.be.equal('Car not found');
    }

    sinon.restore();
  });

  it('Testa se retorna um erro com o id invalido', async function () {
    sinon.stub(Model, 'findOne').resolves(new Error('error'));

    try {
      const service = new CarService();
      await service.getByIdService('63c359e49375e3a47459a92');
    } catch (error) {
      expect(JSON.parse((error as Error).message).message).to.be.equal('Invalid mongo id');
    }
    sinon.restore();
  });
});