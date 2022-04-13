import { Model as MongooseModel, Document } from 'mongoose';
import { Model } from '../interfaces/ModelInterface';

abstract class MongoModel<GenericModel> implements Model<GenericModel> {
  constructor(protected model: MongooseModel<GenericModel & Document>) {}

  async create(data: GenericModel): Promise<GenericModel> {
    const created = await this.model.create(data);
    return created;
  }

  async read(): Promise<GenericModel[]> {
    const all = await this.model.find();
    return all;
  }

  async readOne(id: string): Promise<GenericModel | null> {
    const found = await this.model.findOne({ _id: id });
    return found;
  }

  async update(id: string, data: GenericModel): Promise<GenericModel | null> {
    const updated = await this
      .model
      .findOneAndUpdate({ _id: id }, { ...data }, { new: true });
    return updated;
  }

  async delete(id: string): Promise<GenericModel | null> {
    const deleted = await this.model.findOneAndDelete({ _id: id });
    return deleted;
  }
}

export default MongoModel;