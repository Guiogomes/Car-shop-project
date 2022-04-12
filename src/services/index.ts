import { Model } from '../interfaces/ModelInterface';
import ServiceError from '../interfaces/ServiceErrors';

abstract class Service<GenericInteface> {
  constructor(protected model: Model<GenericInteface>) {}

  async create(data: GenericInteface)
    : Promise<GenericInteface | ServiceError> {
    const created = await this.model.create(data);
    return created;
  }

  async read(): Promise<GenericInteface[]> {
    const all = await this.model.read();
    return all;
  }

  async readOne(id: string): Promise<GenericInteface | null | ServiceError> {
    const found = await this.model.readOne(id);
    return found;
  }

  async update(
    id: string,
    data: GenericInteface,
  ): Promise<GenericInteface | null | ServiceError> {
    const updated = await this.model.update(id, data);
    return updated;
  }

  async delete(id: string): Promise<GenericInteface | null | ServiceError> {
    const deleted = await this.model.delete(id);
    return deleted;
  }
}

export default Service;