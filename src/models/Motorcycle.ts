import { Schema, model as createModel } from 'mongoose';
import MongoModel from './MongoModel';
import { Motorcycle,
  MotorcycleDocument } from '../interfaces/MotorcycleInterface';

const MotorcycleSchema = new Schema<MotorcycleDocument>(
  {
    model: String,
    year: Number,
    color: String,
    status: Boolean,
    buyValue: Number,
    engineCapacity: Number,
    category: String,
  },
  {
    versionKey: false,
  },
);

class MotorcycleModel extends MongoModel<Motorcycle> {
  constructor(model = createModel('Motorcycle', MotorcycleSchema)) {
    super(model);
  }
}

export default MotorcycleModel;