// import { expect } from 'chai';
import { expect } from 'chai';
import mongoose from 'mongoose';
import * as sinon from 'sinon';
import CarsModel from '../../../models/Cars';
import CarsService from '../../../services/Cars';

const returnMock = [
  {
    "_id": "62549568b2c189bba257c7dd",
    "model": "Fiat Uno",
    "year": 2019,
    "color": "Blue",
    "status": true,
    "buyValue": 10000,
    "doorsQty": 4,
    "seatsQty": 5,
  },
  {
    "_id": "62549568b2c189bba257c7dd",
    "model": "Ferrari",
    "year": 2022,
    "color": "Red",
    "status": true,
    "buyValue": 1000000,
    "doorsQty": 2,
    "seatsQty": 2,
  }
]

const carsModel = new CarsModel();
const carsService = new CarsService();

describe('Testings for model layer', () => {
  describe('Testing read method', () => {
    before(() => {
      sinon.stub(carsModel, 'read').resolves(returnMock);
    });
  
    after(() => {
      (carsModel.read as sinon.SinonStub).restore();
    });
  
    it('should return all records', async () => {
      const result = await carsService.read();
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(2);
    });
  })

  describe('Testing readOne method', () => {
    before(() => {
      sinon.stub(carsModel, 'readOne').resolves(returnMock[0]);
    });
  
    after(() => {
      (carsModel.readOne as sinon.SinonStub).restore();
    });
  
    it('should return one record', async () => {
      const id = returnMock[0]._id;
      const result = await carsService.readOne(id);
      expect(result).to.be.an('object');
      expect(result).to.have.property('_id');
      expect(result).to.have.property('model');
      expect(result).to.have.property('year');
      expect(result).to.have.property('color');
      expect(result).to.have.property('buyValue');
      expect(result).to.have.property('doorsQty');
      expect(result).to.have.property('seatsQty');
    });
  })

  describe('Testing create method', () => {
    before(() => {
      sinon.stub(carsModel, 'create').resolves(returnMock[0]);
    });
  
    after(async () => {
      (carsModel.create as sinon.SinonStub).restore();
    });
  
    it('should create a record', async () => {
      const data = {
        "model": "Fiat Uno",
        "year": 2019,
        "color": "Blue",
        "status": true,
        "buyValue": 10000,
        "doorsQty": 4,
        "seatsQty": 5,
      }
      const result = await carsService.create(data);
      expect(result).to.be.an('object');
      expect(result).to.have.property('_id');
      expect(result).to.have.property('model');
      expect(result).to.have.property('year');
      expect(result).to.have.property('color');
      expect(result).to.have.property('buyValue');
      expect(result).to.have.property('doorsQty');
      expect(result).to.have.property('seatsQty');
    });
  });
});