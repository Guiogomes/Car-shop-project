import { Request } from 'express';

interface RequestIncrement<GenericElement> extends Request {
  body: GenericElement;
}
export interface RequestWithId extends Request {
  params: {
    id: string;
  }
}

export default RequestIncrement;