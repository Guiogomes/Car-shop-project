import { expect } from 'chai';
import mongoose from 'mongoose';
import * as sinon from 'sinon';
import { Types } from 'mongoose';
import CarsModel from '../../../models/Cars';
import MotorcycleModel from '../../../models/Motorcycle';

enum categoryOption {
  Custom = "Custom",
  Street = "Street",
  Trail = "Trail",
}

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

const motorcycleSuccessCreateReturn = [{
  _id: new Types.ObjectId(),
  model: "Honda Biz",
  year: 2000,
  color: "Vermelho",
  buyValue: 10000,
  engineCapacity: 4,
  category: categoryOption.Custom,
}]

const carsModel = new CarsModel();
const motorcycleModel = new MotorcycleModel();

describe('Testings for model layer car', () => {
  before(async () => {
    sinon.stub(mongoose, 'connect').resolves();  
  });

  after(() => {
    (mongoose.connect as sinon.SinonStub).restore();
  });

  describe('Testing read method on car', () => {
    before(() => {
      sinon.stub(carsModel, 'read').resolves(returnMock);
    });
  
    after(() => {
      (carsModel.read as sinon.SinonStub).restore();
    });
  
    it('should return all records', async () => {
      const result = await carsModel.read();
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(2);
    });
  })

  describe('Testing readOne method on car', () => {
    before(() => {
      sinon.stub(carsModel, 'readOne').resolves(returnMock[0]);
    });
  
    after(() => {
      (carsModel.readOne as sinon.SinonStub).restore();
    });
  
    it('should return one record', async () => {
      const result = await carsModel.readOne(returnMock[0]._id);
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

  describe('Testing create method on car', () => {
    before(() => {
      sinon.stub(carsModel, 'create').resolves(returnMock[0]);
    });
  
    after(async () => {
      (carsModel.create as sinon.SinonStub).restore();
    });
  
    it('should create a record', async () => {
      const result = await carsModel.create(returnMock[0]);
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

  describe('Testing update method on car', () => {
    before(() => {
      sinon.stub(carsModel, 'update').resolves(returnMock[0]);
    });
  
    after(async () => {
      (carsModel.update as sinon.SinonStub).restore();
    });
  
    it('should update a record', async () => {
      const result = await carsModel.update(returnMock[0]._id, returnMock[0]);
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

  describe('Testing delete method on car', () => {
    before(() => {
      sinon.stub(carsModel, 'delete').resolves(returnMock[0]);
    });
  
    after(async () => {
      (carsModel.delete as sinon.SinonStub).restore();
    });
  
    it('should delete a record', async () => {
      const result = await carsModel.delete(returnMock[0]._id);
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

describe('Testings for model layer motorcycle', () => {
  before(async () => {
    sinon.stub(mongoose, 'connect').resolves();  
  });

  after(() => {
    (mongoose.connect as sinon.SinonStub).restore();
  });

  describe('Testing read method on car', () => {
    before(() => {
      sinon.stub(motorcycleModel, 'read').resolves(motorcycleSuccessCreateReturn);
    });
  
    after(() => {
      (carsModel.read as sinon.SinonStub).restore();
    });
  
    it('should return all records', async () => {
      const result = await carsModel.read();
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(2);
    });
  })

  describe('Testing readOne method on car', () => {
    before(() => {
      sinon.stub(carsModel, 'readOne').resolves(returnMock[0]);
    });
  
    after(() => {
      (carsModel.readOne as sinon.SinonStub).restore();
    });
  
    it('should return one record', async () => {
      const result = await carsModel.readOne(returnMock[0]._id);
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

  describe('Testing create method on car', () => {
    before(() => {
      sinon.stub(carsModel, 'create').resolves(returnMock[0]);
    });
  
    after(async () => {
      (carsModel.create as sinon.SinonStub).restore();
    });
  
    it('should create a record', async () => {
      const result = await carsModel.create(returnMock[0]);
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

  describe('Testing update method on car', () => {
    before(() => {
      sinon.stub(carsModel, 'update').resolves(returnMock[0]);
    });
  
    after(async () => {
      (carsModel.update as sinon.SinonStub).restore();
    });
  
    it('should update a record', async () => {
      const result = await carsModel.update(returnMock[0]._id, returnMock[0]);
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

  describe('Testing delete method on car', () => {
    before(() => {
      sinon.stub(carsModel, 'delete').resolves(returnMock[0]);
    });
  
    after(async () => {
      (carsModel.delete as sinon.SinonStub).restore();
    });
  
    it('should delete a record', async () => {
      const result = await carsModel.delete(returnMock[0]._id);
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
