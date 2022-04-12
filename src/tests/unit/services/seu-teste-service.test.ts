// import { expect } from 'chai';
import * as sinon from 'sinon';
import { expect } from 'chai';
import CarsService from '../../../services/Cars';
import ServiceError from '../../../interfaces/ServiceErrors';
import { Car, CarSchema } from '../../../interfaces/CarInterface';
import { Types } from 'mongoose';

const carsService = new CarsService();
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



describe('Testing Cars Service methods', () => {
  describe('Testing create method', () => {
    describe('Failure create method case', () => {
      it('Pass a invalid object returns an error', async () => {
        const parsed = CarSchema.safeParse(carsErrorCreate) as ServiceError;
        expect(parsed).to.be.an('object');
        expect(parsed).to.have.property('error');
        expect(parsed.error.issues).to.be.an('array');
        expect(parsed.error.issues).to.have.length(5);
      });
    });

    describe('Success create method case', () => {
      before(() => {
        sinon
          .stub(carsService, 'create')
          .resolves(carsSuccessCreateReturn);
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
    describe('Failure read method case', () => {
      before(() => {
        sinon
          .stub(carsService, 'read')
          .rejects(new Error('Error'));
      });

      after(() => {
        (carsService.read as sinon.SinonStub).restore();
      })

      it('Pass a invalid object returns an error', async () => {
        try {
          await carsService.read();
        } catch (error) {
          expect(error).to.be.an('error');
        }
      });
    });

    describe('Success read method case', () => {
      before(() => {
        sinon
          .stub(carsService, 'read')
          .resolves([carsSuccessCreateReturn] as Car[]);
      });

      after(() => {
        (carsService.read as sinon.SinonStub).restore();
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
          .stub(carsService, 'readOne')
          .resolves(undefined);
      });

      after(() => {
        (carsService.readOne as sinon.SinonStub).restore();
      })

      it('Pass a invalid object returns an error', async () => {
        const car = await carsService.readOne('hauahuahauhua');
        expect(car).to.be.undefined;
      });
    });

    describe('Success readOne method case', () => {
      before(() => {
        sinon
          .stub(carsService, 'readOne')
          .resolves(carsSuccessCreateReturn);
      });

      after(() => {
        (carsService.readOne as sinon.SinonStub).restore();
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
      before(() => {
        sinon
          .stub(carsService, 'update')
          .rejects(new Error('Error'));
      });

      after(() => {
        (carsService.update as sinon.SinonStub).restore();
      })

      it('Pass a invalid object returns an error', async () => {
        try {
          await carsService.update('', carsSuccessCreate);
        } catch (error) {
          expect(error).to.be.an('error');
        }
      });
    });

    describe('Success update method case', () => {
      before(() => {
        sinon
          .stub(carsService, 'update')
          .resolves(carsSuccessCreateReturn);
      });

      after(() => {
        (carsService.update as sinon.SinonStub).restore();
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
          .stub(carsService, 'delete')
          .rejects(new Error('Error'));
      });

      after(() => {
        (carsService.delete as sinon.SinonStub).restore();
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
          .stub(carsService, 'delete')
          .resolves(carsSuccessCreateReturn);
      });

      after(() => {
        (carsService.delete as sinon.SinonStub).restore();
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