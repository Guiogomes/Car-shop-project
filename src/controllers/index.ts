import { Request, Response } from 'express';
import RequestIncrement from '../interfaces/RequestIncrement';
import Service from '../services';
import ControllerErrors from '../enums/ControllerErrors';
import StatusCode from '../enums/StatusCode';

export type ResponseError = {
  error: unknown,
};

abstract class Controller<GenericInterface> {
  abstract route: string;

  protected errors = ControllerErrors;

  protected status = StatusCode;

  constructor(protected service: Service<GenericInterface>) {}

  abstract create(req: RequestIncrement<GenericInterface>, res: Response)
  : Promise<typeof res | undefined>;
  abstract read(_req: Request, res: Response): Promise<typeof res>;
  abstract readOne(req: Request, res: Response): Promise<typeof res>;
  abstract update(req: Request, res: Response): Promise<typeof res>;
  abstract delete(req: Request, res: Response): Promise<typeof res>;
}

export default Controller;