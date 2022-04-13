import { Types } from 'mongoose';
import Service from '.';
import ServiceError from '../interfaces/ServiceErrors';
import { Motorcycle,
  MotorcycleSchema } from '../interfaces/MotorcycleInterface';
import MotorcycleModel from '../models/Motorcycle';

class MotorcycleService extends Service<Motorcycle> {
  constructor(model = new MotorcycleModel()) {
    super(model);
  }

  async create(data: Motorcycle): Promise<Motorcycle | ServiceError> {
    const parsed = MotorcycleSchema.safeParse(data);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    const created = await this.model.create(data);
    return created;
  }

  update = async (
    id: string,
    data: Motorcycle,
  ): Promise<Motorcycle | null | ServiceError> => {
    if (!id) return null;
    if (id.length !== new Types.ObjectId().toString().length) return null;
    const parsed = MotorcycleSchema.safeParse(data);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    const updated = await this.model.update(id, data);
    return updated;
  };

  delete = async (
    id: string,
  ): Promise<Motorcycle | null> => {
    if (!id) return null;
    if (id.length !== new Types.ObjectId().toString().length) return null;
    const updated = await this.model.delete(id);
    return updated;
  };
}

export default MotorcycleService;