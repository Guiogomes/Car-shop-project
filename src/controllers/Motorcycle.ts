import { Request, Response } from 'express';
import { Types } from 'mongoose';
import RequestIncrement from '../interfaces/RequestIncrement';
import StatusCode from '../enums/StatusCode';
import Controller, { ResponseError } from '.';
import ControllerErrors from '../enums/ControllerErrors';
import MotorcycleService from '../services/Motorcycle';
import { Motorcycle } from '../interfaces/MotorcycleInterface';

class MotorcycleController extends Controller<Motorcycle> {
  private _route: string;

  status = StatusCode;

  errors = ControllerErrors;

  constructor(service = new MotorcycleService(), route = '/motorcycles') {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req: RequestIncrement<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { category } = req.body;
    if (
      category !== 'Street' && category !== 'Custom' && category !== 'Trail'
    ) {
      return res.status(this.status.B_R).json();
    }
    const created = await this.service.create(req.body);
    if ('error' in created) {
      return res.status(this.status.B_R).json({ error: this.errors.bR });
    }
    return res.status(this.status.CREATED).json(created);
  };

  read = async (_req: Request, res: Response<Motorcycle[]>)
  : Promise<typeof res> => {
    const all = await this.service.read();
    return res.status(this.status.OK).json(all);
  };

  readOne = async (req: Request, res: Response):Promise<typeof res> => {
    const { id } = req.params;
    if (id.length !== new Types.ObjectId().toString().length) {
      return res
        .status(this.status.B_R)
        .json({ error: 'Id must have 24 hexadecimal characters' });
    }
    const found = await this.service.readOne(id);
    if (!found) {
      return res.status(this.status.NOT_FOUND).json({
        error: this.errors.notFound,
      });
    }
    return res.status(this.status.OK).json(found);
  };

  update = async (req: Request, res: Response):Promise<typeof res> => {
    const { id } = req.params;
    if (id.length !== new Types.ObjectId().toString().length) {
      return res
        .status(this.status.B_R)
        .json({ error: 'Id must have 24 hexadecimal characters' });
    }
    const updated = await this.service.update(id, req.body);
    if (!updated) {
      return res.status(this.status.NOT_FOUND).json({
        error: this.errors.notFound,
      });
    }
    if ('error' in updated) {
      return res.status(this.status.B_R);
    }
    console.log(updated);
    return res.status(this.status.OK).json(updated);
  };

  delete = async (req: Request, res: Response):Promise<typeof res> => {
    const deleted = await this.service.delete(req.params.id);
    if (!deleted) {
      return res.status(this.status.NOT_FOUND).json({
        error: this.errors.notFound,
      });
    }
    return res.status(this.status.NO_CONTENT).json(deleted);
  };
}

export default MotorcycleController;