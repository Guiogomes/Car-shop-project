import { Request, Response } from 'express';
import RequestIncrement from '../interfaces/RequestIncrement';
import CarsService from '../services/Cars';
import StatusCode from '../enums/StatusCode';
import { Car } from '../interfaces/CarInterface';
import Controller, { ResponseError } from '.';
import ControllerErrors from '../enums/ControllerErrors';

class CarsController extends Controller<Car> {
  private _route: string;

  status = StatusCode;

  errors = ControllerErrors;

  constructor(service = new CarsService(), route = '/cars') {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req: RequestIncrement<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res | undefined> => {
    try {
      const created = await this.service.create(req.body);
      if (!created) {
        return res.status(this.status.INTERNAL_SERVER_ERROR) 
          .json({ error: this.errors.internalServerError });
      }
      return res.status(this.status.CREATED).json(created);
    } catch (e) {
      return res
        .status(this.status.INTERNAL_SERVER_ERROR) 
        .json({ error: this.errors.internalServerError });
    }
  };

  read = async (_req: Request, res: Response<Car[]>): Promise<typeof res> => {
    const all = await this.service.read();
    return res.status(this.status.OK).json(all);
  };

  readOne = async (req: Request, res: Response):Promise<typeof res> => {
    const found = await this.service.readOne(req.params.id);
    if (!found) {
      return res.status(this.status.NOT_FOUND).json({
        error: this.errors.notFound,
      });
    }
    return res.status(this.status.OK).json(found);
  };

  update = async (req: Request, res: Response):Promise<typeof res> => {
    const updated = await this.service.update(req.params.id, req.body);
    if (!updated) {
      return res.status(this.status.NOT_FOUND).json({
        error: this.errors.notFound,
      });
    }
    return res.status(this.status.OK).json(updated);
  };

  delete = async (req: Request, res: Response):Promise<typeof res> => {
    const deleted = await this.service.delete(req.params.id);
    if (!deleted) {
      return res.status(this.status.NOT_FOUND).json({
        error: this.errors.notFound,
      });
    }
    return res.status(this.status.OK).json(deleted);
  };
}

export default CarsController;