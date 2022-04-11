import { ZodError } from 'zod';

interface ServiceError {
  error: ZodError;
}

export default ServiceError;