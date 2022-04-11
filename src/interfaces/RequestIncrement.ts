import { Request } from 'express';

interface RequestIncrement<GenericElement> extends Request {
  body: GenericElement;
}

export default RequestIncrement;