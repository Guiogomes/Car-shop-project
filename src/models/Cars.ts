import { Schema, model as createModel } from 'mongoose';
import MongoModel from './MongoModel';
import { Car, CarDocument } from '../interfaces/CarInterface';

const CarSchema = new Schema<CarDocument>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
});

class Cars extends MongoModel<Car> {
  constructor(model = createModel('Car', CarSchema)) {
    super(model);
  }
}

export default Cars;