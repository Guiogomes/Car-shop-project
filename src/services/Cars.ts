import { Types } from 'mongoose';
import { Car, CarSchema } from '../interfaces/CarInterface';
import Service from '.';
import ServiceError from '../interfaces/ServiceErrors';
import CarsModel from '../models/Cars';

class CarsService extends Service<Car> {
  constructor(model = new CarsModel()) {
    super(model);
  }

  async create(data: Car): Promise<Car | ServiceError> {
    const parsed = CarSchema.safeParse(data);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    const created = await this.model.create(data);
    return created;
  }

  update = async (
    id: string,
    data: Car,
  ): Promise<Car | null | ServiceError> => {
    if (!id) return null;
    if (id.length !== new Types.ObjectId().toString().length) return null;
    const parsed = CarSchema.safeParse(data);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    const updated = await this.model.update(id, data);
    return updated;
  };
}

export default CarsService;