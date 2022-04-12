import { Car, CarSchema } from '../interfaces/CarInterface';
import Service from '.';
import ServiceError from '../interfaces/ServiceErrors';
import CarsModel from '../models/Cars';

class CarsService extends Service<Car> {
  constructor(model = new CarsModel()) {
    super(model);
  }

  create = async (data: Car): Promise<Car | ServiceError> => {
    const parsed = CarSchema.safeParse(data);
    console.log(parsed);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    const created = await this.model.create(data);
    return created;
  };
}

export default CarsService;