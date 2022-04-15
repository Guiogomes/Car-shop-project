// template para criação dos testes de cobertura da camada de controller

import { Response, Request } from 'express';
import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import CarsController from '../../../controllers/Cars';
import CarsService from '../../../services/Cars';
import MotorcycleService from '../../../services/Motorcycle';
import MotorcycleController from '../../../controllers/Motorcycle';
import { Motorcycle } from '../../../interfaces/MotorcycleInterface';
import { Types } from 'mongoose';
import { Car } from '../../../interfaces/CarInterface';
import { ResponseError } from '../../../controllers';
import RequestIncrement, { RequestWithId } from '../../../interfaces/RequestIncrement';
import { ZodError } from 'zod';

const carService = new CarsService();
const carController = new CarsController(carService, '/cars');
const motorcycleService = new MotorcycleService();
const motorcycleController = new MotorcycleController(motorcycleService, '/motorcycles');
enum categoryOption {
  Custom = "Custom",
  Street = "Street",
  Trail = "Trail",
}

const motorcycleErrorCreate = {
  model: "",
  year: 0,
  color: "",
  buyValue: 0,
  engineCapacity: 0,
  category: categoryOption.Trail,
};

const motorcycleSuccessCreate = {
  model: "Honda Biz",
  year: 2000,
  color: "Vermelho",
  buyValue: 10000,
  engineCapacity: 4,
  category: categoryOption.Custom,
};


const motorcycleSuccessCreateReturn = {
  _id: new Types.ObjectId(),
  model: "Honda Biz",
  year: 2000,
  color: "Vermelho",
  buyValue: 10000,
  engineCapacity: 4,
  category: categoryOption.Custom,
};

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
    describe('testing get route method', () => {      
      it('route is equal a /cars', () => {
        const route = carController.route;
        expect(route).to.be.equal('/cars');
      })
    })
    describe('Testing create method', () => {
      const response = {} as Response;
      const request = {} as RequestIncrement<Car>;
      describe('Success case', () => {
        before(async () => {
          response.status = sinon.stub().returns(response);
          response.json = sinon.stub();
          sinon
            .stub(carService, 'create')
            .resolves(carsSuccessCreateReturn);
        });
      
        after(()=>{
          (carService.create as sinon.SinonStub).restore();
        })
      
        it('Success create car', async () => {
          await carController.create(request as RequestIncrement<Car>, response as unknown as Response)
          expect((response.status as sinon.SinonStub).calledWith(201)).to.be.true;
          expect((response.json as sinon.SinonStub).calledWith(carsSuccessCreateReturn)).to.be.true;
        });
      })

      describe('Error case', () => {
        describe('Testing catch', () => {
          before(async () => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub();
            sinon
              .stub(carService, 'create')
              .rejects();
          });
        
          after(()=>{
            (carService.create as sinon.SinonStub).restore();
          })
        
          it('Error create car', async () => {
            await carController.create(request as RequestIncrement<Car>, response as unknown as Response)
            expect((response.status as sinon.SinonStub).calledWith(500)).to.be.true;
            expect((response.json as sinon.SinonStub).calledWith({ error: 'internal Server Error' })).to.be.true;
          });
        });
        describe('Testing invalid fields', () => {
          before(async () => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub();
            sinon
              .stub(carService, 'create')
              .resolves({ error: new ZodError([]) });
          });
        
          after(()=>{
            sinon.restore();
          })
        
          it('Error create car', async () => {
            await carController.create(request as RequestIncrement<Car>, response as unknown as Response)
            expect((response.status as sinon.SinonStub).calledWith(400)).to.be.true;
            expect((response.json as sinon.SinonStub).calledWith({ error: 'Bad request' })).to.be.true;
          });
        });
        describe('Testing undefined return', () => {
          before(async () => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub();
            sinon
              .stub(carService, 'create')
              .resolves(undefined);
          });
        
          after(()=>{
            sinon.restore();
          });

          it('Returns undefined', async() => {
            await carController.create(request as RequestIncrement<Car>, response as unknown as Response)
            expect((response.status as sinon.SinonStub).calledWith(500)).to.be.true;
            expect((response.json as sinon.SinonStub).calledWith({ error: 'internal Server Error' })).to.be.true;
          });
        });
      })

    });

    describe('Testing read method', () => {
      const response = {} as Response;
      const request = {} as Request;
      before(async () => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub();
        sinon
          .stub(carService, 'read')
          .resolves([carsSuccessCreateReturn]);
      });
    
      after(()=>{
        (carService.read as sinon.SinonStub).restore();
      })
    
      it('Success read car', async () => {
        await carController.read(request, response);
        expect((response.status as sinon.SinonStub).calledWith(200)).to.be.true;
        expect((response.json as sinon.SinonStub).calledWith([carsSuccessCreateReturn])).to.be.true;
      });

    });

    describe('Testing readOne method', () => {
      describe('Success case', () => {
        const response = {} as Response;
        const request = {} as Request;
        before(async () => {          
          response.status = sinon.stub().returns(response);
          response.json = sinon.stub();
          request.params = { id: new Types.ObjectId().toString() };
          sinon
            .stub(carService, 'readOne')
            .resolves(carsSuccessCreateReturn);
        });
      
        after(()=>{
          sinon.restore();
        })
      
        it('Success readOne car', async () => {
          await carController.readOne(request, response);
          expect((response.status as sinon.SinonStub).calledWith(200)).to.be.true;
          expect((response.json as sinon.SinonStub).calledWith(carsSuccessCreateReturn)).to.be.true;
        });
      });

      describe('Error case', () => {
        describe('Testing invalid id', () => {
          const response = {} as Response;
          const request = {} as Request;

          before(async () => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub();
            request.params = { id: new Types.ObjectId().toString() };
            sinon
              .stub(carService, 'readOne')
              .resolves(null);
          });
        
          after(()=>{
            sinon.restore();
          })
        
          it('Error readOne car', async () => {
            await carController.readOne(request, response);
            expect((response.status as sinon.SinonStub).calledWith(404)).to.be.true;
            expect((response.json as sinon.SinonStub).calledWith({ error: 'Object not found' })).to.be.true;
          });
        });
      });

    });

    describe('Testing update method', () => {
      describe('Error case', () => {
        describe('Testing invalid id', () => {
          const response = {} as Response;
          const request = {} as Request;

          before(async () => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub();
            request.params = { id: new Types.ObjectId().toString() };
            sinon
              .stub(carService, 'readOne')
              .resolves(null);
          });
        
          after(()=>{
            sinon.restore();
          })
        
          it('Error readOne car', async () => {
            await carController.readOne(request, response);
            expect((response.status as sinon.SinonStub).calledWith(404)).to.be.true;
            expect((response.json as sinon.SinonStub).calledWith({ error: 'Object not found' })).to.be.true;
          });
        });

        describe('Testing invalid fields', () => {
          const response = {} as Response;
          const request = {} as RequestIncrement<Car>;
          before(async () => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub();
            request.params = { id: new Types.ObjectId().toString() };
            sinon
            .stub(carService, 'update')
            .resolves({ error: new ZodError([]) });
          });
        
          after(()=>{
            sinon.restore();
          })
        
          it('Error readOne car with invalid fields', async () => {
            await carController.update(request as RequestIncrement<Car>, response as unknown as Response)
            expect((response.status as sinon.SinonStub).calledWith(400)).to.be.true;
          });
        });
        
      });

    });

    describe('Testing delete method', () => {
      describe('Error case', () => {
        describe('Testing invalid id', () => {
          const response = {} as Response;
          const request = {} as Request;

          before(async () => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub();
            request.params = { id: new Types.ObjectId().toString() };
            sinon
              .stub(carService, 'delete')
              .resolves(null);
          });
        
          after(()=>{
            sinon.restore();
          })
        
          it('Error delete car', async () => {
            await carController.delete(request, response);
            expect((response.status as sinon.SinonStub).calledWith(404)).to.be.true;
            expect((response.json as sinon.SinonStub).calledWith({ error: 'Object not found' })).to.be.true;
          });
        });
      });

      describe('Success case', () => {
        const response = {} as Response;
        const request = {} as Request;
        before(async () => {
          response.status = sinon.stub().returns(response);
          response.json = sinon.stub();
          request.params = { id: new Types.ObjectId().toString() };
          sinon
            .stub(carService, 'delete')
            .resolves(carsSuccessCreateReturn);
        });
      
        after(()=>{
          sinon.restore();
        })
      
        it('Success delete car', async () => {
          await carController.delete(request, response);
          expect((response.status as sinon.SinonStub).calledWith(204)).to.be.true;
          expect((response.json as sinon.SinonStub).calledWith(carsSuccessCreateReturn)).to.be.true;
        });
      });

    });
  });

  describe('Testing MotorcycleController methods', () => {
    describe('testing get route method', () => {      
      it('route is equal a /motorcycles', () => {
        const route = motorcycleController.route;
        expect(route).to.be.equal('/motorcycles');
      })
    })
    describe('Testing create method', () => {
      const response = {} as Response;
      const request = {} as RequestIncrement<Motorcycle>;
      describe('Success case', () => {
        before(async () => {
          response.status = sinon.stub().returns(response);
          response.json = sinon.stub();
          request.body = motorcycleSuccessCreate;
          sinon
            .stub(motorcycleService, 'create')
            .resolves(motorcycleSuccessCreateReturn);
        });
      
        after(()=>{
          (motorcycleService.create as sinon.SinonStub).restore();
        })
      
        it('Success create motorcycle', async () => {
          await motorcycleController.create(request as RequestIncrement<Motorcycle>, response as unknown as Response)
          expect((response.status as sinon.SinonStub).calledWith(201)).to.be.true;
          expect((response.json as sinon.SinonStub).calledWith(motorcycleSuccessCreateReturn)).to.be.true;
        });
      })

      describe('Error case', () => {
        describe('Testing invalid fields', () => {
          before(async () => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub();
            sinon
              .stub(motorcycleService, 'create')
              .resolves({ error: new ZodError([]) });
          });
        
          after(()=>{
            sinon.restore();
          })
        
          it('Error create motorcycle', async () => {
            await motorcycleController.create(request as RequestIncrement<Motorcycle>, response as unknown as Response)
            expect((response.status as sinon.SinonStub).calledWith(400)).to.be.true;
            expect((response.json as sinon.SinonStub).calledWith({ error: 'Bad request' })).to.be.true;
          });
        });
        describe('Testing wrong category return', () => {
          const request = {} as RequestIncrement<Motorcycle>;
          const response = {} as Response;

          before(async () => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub();
            request.body = {
              ...motorcycleSuccessCreate,
              category: 'wrong' as categoryOption,
            }
            sinon
              .stub(motorcycleService, 'create')
              .resolves(undefined);
          });
        
          after(()=>{
            sinon.restore();
          });

          it('Returns a bad request status', async() => {
            await motorcycleController.create(request as RequestIncrement<Motorcycle>, response as unknown as Response)
            expect((response.status as sinon.SinonStub).calledWith(400)).to.be.true;
          });
        });
      })

    });

    describe('Testing read method', () => {
      const response = {} as Response;
      const request = {} as Request;
      before(async () => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub();
        sinon
          .stub(motorcycleService, 'read')
          .resolves([motorcycleSuccessCreateReturn]);
      });
    
      after(()=>{
        (motorcycleService.read as sinon.SinonStub).restore();
      })
    
      it('Success read car', async () => {
        await motorcycleController.read(request, response);
        expect((response.status as sinon.SinonStub).calledWith(200)).to.be.true;
        expect((response.json as sinon.SinonStub).calledWith([motorcycleSuccessCreateReturn])).to.be.true;
      });

    });

    describe('Testing readOne method', () => {
      describe('Success case', () => {
        const response = {} as Response;
        const request = {} as Request;
        before(async () => {          
          response.status = sinon.stub().returns(response);
          response.json = sinon.stub();
          request.params = { id: new Types.ObjectId().toString() };
          sinon
            .stub(motorcycleService, 'readOne')
            .resolves(motorcycleSuccessCreateReturn);
        });
      
        after(()=>{
          sinon.restore();
        })
      
        it('Success readOne car', async () => {
          await motorcycleController.readOne(request, response);
          expect((response.status as sinon.SinonStub).calledWith(200)).to.be.true;
          expect((response.json as sinon.SinonStub).calledWith(motorcycleSuccessCreateReturn)).to.be.true;
        });
      });

      describe('Error case', () => {
        describe('Testing invalid id', () => {
          const response = {} as Response;
          const request = {} as Request;

          before(async () => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub();
            request.params = { id: new Types.ObjectId().toString() };
            sinon
              .stub(motorcycleService, 'readOne')
              .resolves(null);
          });
        
          after(()=>{
            sinon.restore();
          })
        
          it('Error readOne car', async () => {
            await motorcycleController.readOne(request, response);
            expect((response.status as sinon.SinonStub).calledWith(404)).to.be.true;
            expect((response.json as sinon.SinonStub).calledWith({ error: 'Object not found' })).to.be.true;
          });
        });
      });

    });

    describe('Testing update method', () => {
      describe('Error case', () => {
        describe('Testing invalid id', () => {
          const response = {} as Response;
          const request = {} as Request;

          before(async () => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub();
            request.params = { id: new Types.ObjectId().toString() };
            sinon
              .stub(motorcycleService, 'readOne')
              .resolves(null);
          });
        
          after(()=>{
            sinon.restore();
          })
        
          it('Error readOne car', async () => {
            await motorcycleController.readOne(request, response);
            expect((response.status as sinon.SinonStub).calledWith(404)).to.be.true;
            expect((response.json as sinon.SinonStub).calledWith({ error: 'Object not found' })).to.be.true;
          });
        });

        describe('Testing invalid fields', () => {
          const response = {} as Response;
          const request = {} as RequestIncrement<Motorcycle>;
          before(async () => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub();
            request.params = { id: new Types.ObjectId().toString() };
            sinon
            .stub(motorcycleService, 'update')
            .resolves({ error: new ZodError([]) });
          });
        
          after(()=>{
            sinon.restore();
          })
        
          it('Error readOne car with invalid fields', async () => {
            await motorcycleController.update(request as RequestIncrement<Motorcycle>, response as unknown as Response)
            expect((response.status as sinon.SinonStub).calledWith(400)).to.be.true;
          });
        });
        
      });

    });

    describe('Testing delete method', () => {
      describe('Error case', () => {
        describe('Testing invalid id', () => {
          const response = {} as Response;
          const request = {} as Request;

          before(async () => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub();
            request.params = { id: new Types.ObjectId().toString() };
            sinon
              .stub(motorcycleService, 'delete')
              .resolves(null);
          });
        
          after(()=>{
            sinon.restore();
          })
        
          it('Error delete car', async () => {
            await motorcycleController.delete(request, response);
            expect((response.status as sinon.SinonStub).calledWith(404)).to.be.true;
            expect((response.json as sinon.SinonStub).calledWith({ error: 'Object not found' })).to.be.true;
          });
        });
      });

      describe('Success case', () => {
        const response = {} as Response;
        const request = {} as Request;
        before(async () => {
          response.status = sinon.stub().returns(response);
          response.json = sinon.stub();
          request.params = { id: new Types.ObjectId().toString() };
          sinon
            .stub(motorcycleService, 'delete')
            .resolves(motorcycleSuccessCreateReturn);
        });
      
        after(()=>{
          sinon.restore();
        })
      
        it('Success delete car', async () => {
          await motorcycleController.delete(request, response);
          expect((response.status as sinon.SinonStub).calledWith(204)).to.be.true;
          expect((response.json as sinon.SinonStub).calledWith(motorcycleSuccessCreateReturn)).to.be.true;
        });
      });

    });
  });
});