import { Document } from 'mongoose';
import { z } from 'zod';
import { Vehicle, VehicleSchema } from './VehicleInterface';

export const MotorcycleSchema = VehicleSchema.extend({
  engineCapacity: z.number().int().gte(1).lte(2500),
  category: z.enum(['Street', 'Custom', 'Trail']),
});

type MotorcycleType = z.infer<typeof MotorcycleSchema>;

export interface Motorcycle extends Vehicle, MotorcycleType {}
export interface MotorcycleDocument extends Motorcycle, Document {}