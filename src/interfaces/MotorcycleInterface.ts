import { Document } from 'mongoose';
import { z } from 'zod';
import { Vehicle, VehicleSchema } from './VehicleInterface';

export const MotorcycleSchema = VehicleSchema.extend({
  // positive usado com ajuda de Ivanielson Cabral,
  // faz com que o número seja um número positivo maior que 0
  engineCapacity: z.number().int().positive().max(2500),
  category: z.enum(['Street', 'Custom', 'Trail']),
});

type MotorcycleType = z.infer<typeof MotorcycleSchema>;

export interface Motorcycle extends Vehicle, MotorcycleType {}
export interface MotorcycleDocument extends Motorcycle, Document {}