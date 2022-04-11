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

  read = async (_req: Request, res: Response): Promise<typeof res> => {
    const all = await this.service.read();
    return res.status(this.status.OK).json(all);
  };

  readOne = async (req: Request, res: Response): Promise<typeof res> => {
    const found = await this.service.readOne(req.params.id);
    if (!found) {
      return res.status(this.status.NOT_FOUND).json({
        error: this.errors.notFound,
      });
    }
    return res.status(this.status.OK).json(found);
  };

  update = async (req: Request, res: Response): Promise<typeof res> => {
    const updated = await this.service.update(req.params.id, req.body);
    if (!updated) {
      return res.status(this.status.NOT_FOUND).json({
        error: this.errors.notFound,
      });
    }
    return res.status(this.status.OK).json(updated);
  };

  delete = async (req: Request, res: Response): Promise<typeof res> => {
    const deleted = await this.service.delete(req.params.id);
    if (!deleted) {
      return res.status(this.status.NOT_FOUND).json({
        error: this.errors.notFound,
      });
    }
    return res.status(this.status.OK).json(deleted);
  };
}

export default Controller;