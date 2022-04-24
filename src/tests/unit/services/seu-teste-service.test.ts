// import { expect } from 'chai';
import { ZodError } from 'zod';
import * as sinon from 'sinon';
import { expect } from 'chai';
import CarsService from '../../../services/Cars';
import MotorcycleService from '../../../services/Motorcycle';
import CarsModel from '../../../models/Cars';
import MotorcycleModel from '../../../models/Motorcycle';
import ServiceError from '../../../interfaces/ServiceErrors';
import { Car, CarSchema } from '../../../interfaces/CarInterface';
import { Types } from 'mongoose';
import { Motorcycle, MotorcycleSchema } from '../../../interfaces/MotorcycleInterface';

const carModel = new CarsModel();
const motorcycleModel = new MotorcycleModel();
const carsService = new CarsService(carModel);
const motorcycleService = new MotorcycleService(motorcycleModel);
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

describe('Testing Cars Service methods', () => {
  describe('Testing create method', () => {    
    describe('Failure create method case', () => {
      before(() => {
        sinon
          .stub(CarSchema, 'safeParse')
          .resolves(new ZodError([]));
      })
  
      after(() => {
        (CarSchema.safeParse as sinon.SinonStub).restore();
      })
      it('Pass a invalid object returns an error', async () => {
        const parsed = await carsService.create(carsErrorCreate);
        expect(parsed).to.be.an('object');
        expect(parsed).to.have.property('error');
      });
    });

    describe('Success create method case', () => {      
      before(async () => {
        sinon
          .stub(carsService, 'create')
          .resolves(carsSuccessCreateReturn as Car);
      });

      after(() => {
        (carsService.create as sinon.SinonStub).restore();
      })
      it('Pass a valid object returns a success', async () => {
        const created = await carsService.create(carsSuccessCreate);
        expect(created).to.be.an('object');
        expect(created).to.have.property('_id');
        expect(created).to.have.property('model');
        expect(created).to.have.property('year');
        expect(created).to.have.property('color');
        expect(created).to.have.property('buyValue');
        expect(created).to.have.property('doorsQty');
        expect(created).to.have.property('seatsQty');
      });
    });
  });

  describe('Testing read method', () => {
    describe('Success read method case', () => {
      before(() => {
        sinon
          .stub(carModel, 'read')
          .resolves([carsSuccessCreateReturn] as Car[]);
      });

      after(() => {
        (carModel.read as sinon.SinonStub).restore();
      })

      it('Pass a valid object returns a success', async () => {
        const read = await carsService.read();
        expect(read).to.be.an('array');
        expect(read).to.have.lengthOf(1);
      });
    });
  });

  describe('Testing readOne method', () => {
    describe('Failure readOne method case', () => {
      before(() => {
        sinon
          .stub(carModel, 'readOne')
          .resolves(undefined);
      });

      after(() => {
        (carModel.readOne as sinon.SinonStub).restore();
      })

      it('Pass a invalid object returns an error', async () => {
        const car = await carsService.readOne('hauahuahauhua');
        expect(car).to.be.undefined;
      });
    });

    describe('Success readOne method case', () => {
      before(() => {
        sinon
          .stub(carModel, 'readOne')
          .resolves(carsSuccessCreateReturn);
      });

      after(() => {
        (carModel.readOne as sinon.SinonStub).restore();
      })

      it('Pass a valid object returns a success', async () => {
        const readOne = await carsService.readOne(carsSuccessCreateReturn._id.toString());
        expect(readOne).to.be.an('object');
        expect(readOne).to.have.property('_id');
        expect(readOne).to.have.property('model');
        expect(readOne).to.have.property('year');
        expect(readOne).to.have.property('color');
        expect(readOne).to.have.property('buyValue');
        expect(readOne).to.have.property('doorsQty');
        expect(readOne).to.have.property('seatsQty');
      });
    });
  })

  describe('Testing update method', () => {
    describe('Failure update method case', () => {
      it('Pass a invalid object returns an error', async () => {
        const parsed = CarSchema.safeParse(carsErrorCreate) as ServiceError;
        expect(parsed).to.be.an('object');
        expect(parsed).to.have.property('error');
        expect(parsed.error.issues).to.be.an('array');
      })

      it('Pass a invalid id returns a error', async () => {
        const updated = await carsService.update('', carsSuccessCreate);
        expect(updated).to.be.null;
      })

      it('Pass a invalid id returns a error', async() => {
        const updated = await carsService.update('hauahuahua', carsSuccessCreate);
        expect(updated).to.be.null;
      })

    });

    describe('Success update method case', () => {
      before(() => {
        sinon
          .stub(carModel, 'update')
          .resolves(carsSuccessCreateReturn);
      });

      after(() => {
        (carModel.update as sinon.SinonStub).restore();
      })

      it('Pass a valid object returns a success', async () => {
        const updated = await carsService.update(carsSuccessCreateReturn._id.toString(), carsSuccessCreate);
        expect(updated).to.be.an('object');
        expect(updated).to.have.property('_id');
        expect(updated).to.have.property('model');
        expect(updated).to.have.property('year');
        expect(updated).to.have.property('color');
        expect(updated).to.have.property('buyValue');
        expect(updated).to.have.property('doorsQty');
        expect(updated).to.have.property('seatsQty');
      });
    });
  });

  describe('Testing delete method', () => {
    describe('Failure delete method case', () => {
      before(() => {
        sinon
          .stub(carModel, 'delete')
          .rejects(new Error('Error'));
      });

      after(() => {
        (carModel.delete as sinon.SinonStub).restore();
      })

      it('Pass a invalid object returns an error', async () => {
        try {
          await carsService.delete('');
        } catch (error) {
          expect(error).to.be.an('error');
        }
      });
    });

    describe('Success delete method case', () => {
      before(() => {
        sinon
          .stub(carModel, 'delete')
          .resolves(carsSuccessCreateReturn);
      });

      after(() => {
        (carModel.delete as sinon.SinonStub).restore();
      })

      it('Pass a valid object returns a success', async () => {
        const deleted = await carsService.delete(carsSuccessCreateReturn._id.toString());
        expect(deleted).to.be.an('object');
        expect(deleted).to.have.property('_id');
        expect(deleted).to.have.property('model');
        expect(deleted).to.have.property('year');
        expect(deleted).to.have.property('color');
        expect(deleted).to.have.property('buyValue');
        expect(deleted).to.have.property('doorsQty');
        expect(deleted).to.have.property('seatsQty');
      });
    });
  })
});

describe('Testing Motorcycle Service methods', () => {
  describe('Testing create method', () => {    
      describe('Failure create method case', () => {
        before(() => {
          sinon
            .stub(MotorcycleSchema, 'safeParse')
            .resolves(new ZodError([]));
        })
    
        after(() => {
          (MotorcycleSchema.safeParse as sinon.SinonStub).restore();
        })
        it('Pass a invalid object returns an error', async () => {
          const parsed = await motorcycleService.create(motorcycleErrorCreate);
          expect(parsed).to.be.an('object');
          expect(parsed).to.have.property('error');
          expect('error' in parsed).to.be.equal(true);
        });
      });

      describe('Success create method case', () => {      
        before(async () => {
          sinon
            .stub(motorcycleModel, 'create')
            .resolves(motorcycleSuccessCreateReturn);
        });

        after(() => {
          (motorcycleModel.create as sinon.SinonStub).restore();
        })
        it('Pass a valid object returns a success', async () => {
          const created = await motorcycleService.create(motorcycleSuccessCreate);
          expect(created).to.be.an('object');
          expect(created).to.have.property('_id');
          expect(created).to.have.property('model');
          expect(created).to.have.property('year');
          expect(created).to.have.property('color');
          expect(created).to.have.property('buyValue');
        });
      });
  });

  describe('Testing read method', () => {
    describe('Success read method case', () => {
      before(() => {
        sinon
          .stub(motorcycleModel, 'read')
          .resolves([motorcycleSuccessCreateReturn] as Motorcycle[]);
      });

      after(() => {
        (motorcycleModel.read as sinon.SinonStub).restore();
      })

      it('Pass a valid object returns a success', async () => {
        const read = await motorcycleService.read();
        expect(read).to.be.an('array');
        expect(read).to.have.lengthOf(1);
      });
    });
  });

  describe('Testing readOne method', () => {
    describe('Failure readOne method case', () => {
      before(() => {
        sinon
          .stub(motorcycleModel, 'readOne')
          .resolves(undefined);
      });

      after(() => {
        (motorcycleModel.readOne as sinon.SinonStub).restore();
      })

      it('Pass a invalid object returns an error', async () => {
        const motorcycle = await motorcycleService.readOne('hauahuahauhua');
        expect(motorcycle).to.be.undefined;
      });
    });

    describe('Success readOne method case', () => {
      before(() => {
        sinon
          .stub(motorcycleModel, 'readOne')
          .resolves(motorcycleSuccessCreateReturn);
      });

      after(() => {
        (motorcycleModel.readOne as sinon.SinonStub).restore();
      })

      it('Pass a valid object returns a success', async () => {
        const readOne = await motorcycleService.readOne(motorcycleSuccessCreateReturn._id.toString());
        expect(readOne).to.be.an('object');
        expect(readOne).to.have.property('_id');
        expect(readOne).to.have.property('model');
        expect(readOne).to.have.property('year');
        expect(readOne).to.have.property('color');
        expect(readOne).to.have.property('buyValue');
      });
    });
  })

  describe('Testing update method', () => {
  describe('Failure update method case', () => {
    describe('Passing a invalid object', () => {
      before(() => {
        sinon
          .stub(MotorcycleSchema, 'safeParse')
          .resolves(new ZodError([]));
      })
  
      after(() => {
        (MotorcycleSchema.safeParse as sinon.SinonStub).restore();
      })

      it('Pass a invalid object returns an error', async () => {
        const parsed =  await motorcycleService.create(motorcycleErrorCreate);
        expect(parsed).to.be.an('object');
        expect(parsed).to.have.property('error');
        expect('error' in parsed).to.be.equal(true);
      })

      it('safeParse success have value false', () => {
        const parsed =  MotorcycleSchema.safeParse(motorcycleErrorCreate);
        expect(parsed).to.be.an('object');
        expect(parsed).to.have.property('success');
        expect(parsed.success).to.be.equal(false);
      });
    });

    describe('Passing invalid id', () => {
      before(() => {
        sinon
          .stub(motorcycleModel, 'update')
          .resolves(null)
      });
      after(() => {
        (motorcycleModel.update as sinon.SinonStub).restore();
      });
      it('Pass a invalid id returns a error', async () => {
        const updated = await motorcycleService.update('', motorcycleSuccessCreate);
        expect(updated).to.be.null;
      });
    })

    describe('Passing an id diferent of Oid', () => {
      before(() => {
        sinon
          .stub(motorcycleModel, 'update')
          .resolves(null)
      });
      after(() => {
        (motorcycleModel.update as sinon.SinonStub).restore();
      });

      it('Pass a invalid id returns a error', async() => {
        const updated = await motorcycleService.update('ahusdahsudhauhaudsahuhada', motorcycleSuccessCreate);
        expect(updated).to.be.null;
      })
    });
  });


    describe('Success update method case', () => {
      before(() => {
        sinon
          .stub(motorcycleModel, 'update')
          .resolves(motorcycleSuccessCreateReturn);
      });

      after(() => {
        (motorcycleModel.update as sinon.SinonStub).restore();
      })

      it('Pass a valid object returns a success', async () => {
        const updated = await motorcycleService.update(carsSuccessCreateReturn._id.toString(), motorcycleSuccessCreate);
        expect(updated).to.be.an('object');
        expect(updated).to.have.property('_id');
        expect(updated).to.have.property('model');
        expect(updated).to.have.property('year');
        expect(updated).to.have.property('color');
        expect(updated).to.have.property('buyValue');

      });
    });
  });
  
  describe('Testing delete method', () => {
    describe('Failure delete method case', () => {
      before(() => {
        sinon
          .stub(motorcycleModel, 'delete')
          .rejects(new Error('Error'));
      });

      after(() => {
        (motorcycleModel.delete as sinon.SinonStub).restore();
      })

      it('Pass a invalid object returns an error', async () => {
        try {
          await motorcycleService.delete('');
        } catch (error) {
          expect(error).to.be.an('error');
        }
      });
    });

    describe('Success delete method case', () => {
      before(() => {
        sinon
          .stub(motorcycleModel, 'delete')
          .resolves(motorcycleSuccessCreateReturn);
      });

      after(() => {
        (motorcycleModel.delete as sinon.SinonStub).restore();
      })

      it('Pass a valid object returns a success', async () => {
        const deleted = await motorcycleService.delete(motorcycleSuccessCreateReturn._id.toString());
        expect(deleted).to.be.an('object');
        expect(deleted).to.have.property('_id');
        expect(deleted).to.have.property('model');
        expect(deleted).to.have.property('year');
        expect(deleted).to.have.property('color');
        expect(deleted).to.have.property('buyValue');

      });
    });
  });
});

