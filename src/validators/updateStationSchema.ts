import { z } from 'zod';

export const updateStationSchema = z.object({
  name: z.string().min(1),
  capacity: z.number().min(1).nonnegative('Capacity must be positive'),
  lon: z.number().min(-180).max(180),
  lat: z.number().min(-90).max(90),
});
