import { Document } from 'mongoose';
import { z } from 'zod';
import { VehicleSchema } from './VehicleInterface';

export const MotorcycleSchema = VehicleSchema.extend({
  engineCapacity: z.number().int().gte(0).lte(2500),
  category: z.string(),
});

type MotorcycleType = z.infer<typeof MotorcycleSchema>;

export interface Motorcycle extends MotorcycleType {
  category: 'Street' | 'Custom' | 'Trail';
}

export interface MotorcycleDocument extends Motorcycle, Document {}