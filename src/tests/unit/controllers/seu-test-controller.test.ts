// template para criação dos testes de cobertura da camada de controller

import { Response } from 'express';
import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import CarsController from '../../../controllers/Cars';
import { Types } from 'mongoose';
import { Car } from '../../../interfaces/CarInterface';
import { ResponseError } from '../../../controllers';
import RequestIncrement from '../../../interfaces/RequestIncrement';

const carController = new CarsController();
const carsErrorCreate = {
  model: "",
  year: 0,
  color: "",
  buyValue: 0,
  doorsQty: 0,
  seatsQty: 0,
};

const carsSuccessCreate = {
  model: "Fiat Uno",
  year: 2000,
  color: "Vermelho",
  buyValue: 10000,
  doorsQty: 4,
  seatsQty: 5,
};

const carsSuccessCreateReturn = {
  _id: new Types.ObjectId(),
  model: "Fiat Uno",
  year: 2000,
  color: "Vermelho",
  buyValue: 10000,
  doorsQty: 4,
  seatsQty: 5,
};

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing Controller methods', () => {
  describe('Testing CarsController methods', () => {
    describe('Testing create method', () => {
      const response = {
        status: 201,
        body: carsSuccessCreateReturn,
      }
      const request = {
        body: {}
      };
      before(async () => {
        request.body = carsSuccessCreate;
        sinon
          .stub(carController, 'create')
          .resolves(response as unknown as Response);
      });
    
      after(()=>{
        (carController.create as sinon.SinonStub).restore();
      })
    
      it('Success create car', async () => {
        await carController.create(request as RequestIncrement<Car>, response as unknown as Response)
        expect(response.status).to.be.equal(201);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('_id');
        expect(response.body).to.have.property('model');
        expect(response.body).to.have.property('year');
        expect(response.body).to.have.property('color');
        expect(response.body).to.have.property('buyValue');
        expect(response.body).to.have.property('doorsQty');
        expect(response.body).to.have.property('seatsQty');
      });

    });

    describe('Testing read method', () => {
      const response = {
        status: 200,
        body: [carsSuccessCreateReturn],
      }
      const request = {};
      before(async () => {
        sinon
          .stub(carController, 'read')
          .resolves(response as unknown as Response);
      });
    
      after(()=>{
        (carController.read as sinon.SinonStub).restore();
      })
    
      it('Success read car', async () => {
        await carController.read(request as RequestIncrement<Car>, response as unknown as Response)
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body[0]).to.be.an('object');
        expect(response.body[0]).to.have.property('_id');
        expect(response.body[0]).to.have.property('model');
        expect(response.body[0]).to.have.property('year');
        expect(response.body[0]).to.have.property('color');
        expect(response.body[0]).to.have.property('buyValue');
        expect(response.body[0]).to.have.property('doorsQty');
        expect(response.body[0]).to.have.property('seatsQty');
      });

    });

    describe('Testing readOne method', () => {
      const response = {
        status: 200,
        body: carsSuccessCreateReturn,
      }
      const request = {
        params: {
          id: new Types.ObjectId()
        }
      };
      before(async () => {
        sinon
          .stub(carController, 'readOne')
          .resolves(response as unknown as Response);
      });
    
      after(()=>{
        (carController.readOne as sinon.SinonStub).restore();
      })
    
      it('Success readOne car', async () => {
        await carController.readOne(request as unknown as RequestIncrement<Car>, response as unknown as Response)
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('_id');
        expect(response.body).to.have.property('model');
        expect(response.body).to.have.property('year');
        expect(response.body).to.have.property('color');
        expect(response.body).to.have.property('buyValue');
        expect(response.body).to.have.property('doorsQty');
        expect(response.body).to.have.property('seatsQty');
      });

    });

    describe('Testing update method', () => {
      const response = {
        status: 200,
        body: carsSuccessCreateReturn,
      }
      const request = {
        body: {},
        params: new Types.ObjectId().toString()
      };
      before(async () => {
        request.body = carsSuccessCreate;
        sinon
          .stub(carController, 'update')
          .resolves(response as unknown as Response);
      });
    
      after(()=>{
        (carController.update as sinon.SinonStub).restore();
      })
    
      it('Success update car', async () => {
        await carController.update(request as unknown as RequestIncrement<Car>, response as unknown as Response)
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('_id');
        expect(response.body).to.have.property('model');
        expect(response.body).to.have.property('year');
        expect(response.body).to.have.property('color');
        expect(response.body).to.have.property('buyValue');
        expect(response.body).to.have.property('doorsQty');
        expect(response.body).to.have.property('seatsQty');
      });

    });

    describe('Testing delete method', () => {
      const response = {
        status: 200,
        body: carsSuccessCreateReturn,
      }
      const request = {
        params: new Types.ObjectId().toString()
      };
      before(async () => {
        sinon
          .stub(carController, 'delete')
          .resolves(response as unknown as Response);
      });
    
      after(()=>{
        (carController.delete as sinon.SinonStub).restore();
      })
    
      it('Success delete car', async () => {
        await carController.delete(request as unknown as RequestIncrement<Car>, response as unknown as Response)
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('_id');
        expect(response.body).to.have.property('model');
        expect(response.body).to.have.property('year');
        expect(response.body).to.have.property('color');
        expect(response.body).to.have.property('buyValue');
        expect(response.body).to.have.property('doorsQty');
        expect(response.body).to.have.property('seatsQty');
      });

    });
  })

});