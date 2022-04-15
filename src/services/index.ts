import { Model } from '../interfaces/ModelInterface';
import ServiceError from '../interfaces/ServiceErrors';

abstract class Service<GenericInteface> {
  constructor(protected model: Model<GenericInteface>) {}

  abstract create(data: GenericInteface)
  : Promise<GenericInteface | ServiceError>;

  abstract read(): Promise<GenericInteface[]>;

  abstract readOne(id: string)
  : Promise<GenericInteface | null | ServiceError>;

  abstract update(
    id: string,
    data: GenericInteface,
  ): Promise<GenericInteface | null | ServiceError>;

  abstract delete(id: string): Promise<GenericInteface | null>;
}

export default Service;