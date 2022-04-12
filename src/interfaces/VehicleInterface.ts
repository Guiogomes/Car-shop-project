import { z } from 'zod';

export const VehicleSchema = z.object({
  model: z
    .string({
      required_error: 'Model is required',
      invalid_type_error: 'Model must be a string',
    })
    .min(3, { message: 'Model must be at least 3 characters long' }),
  year: z
    .number({
      required_error: 'Year is required',
      invalid_type_error: 'Year must be a number',
    })
    .gte(1900, { message: 'Year must be greater or equal than 1900' })
    .lte(2022, { message: 'Year must be less or equal than 2022' }),
  color: z
    .string({
      required_error: 'Color is required',
      invalid_type_error: 'Color must be a string',
    })
    .min(3, { message: 'Color must be at least 3 characters long' }),
  buyValue: z
    .number({
      required_error: 'Buy value is required',
      invalid_type_error: 'Buy value must be a number',
    }).int(),
});

type VehicleType = z.infer<typeof VehicleSchema>;

export interface Vehicle extends VehicleType {
  status?: boolean;
}