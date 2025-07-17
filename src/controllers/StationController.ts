import { Request, Response } from 'express';
import { stationService } from '../services/StationService.js';
import { updateStationSchema } from '../validators/updateStationSchema.js';

export const updateStation = async (req: Request, res: Response) => {
  const stationId = req.params.id;

  try {
    const existingStation = await stationService.findById(stationId);
    if (!existingStation) {
      return res.status(404).send(`Station ${stationId} not found`);
    }

    const parseBodyResult = updateStationSchema.safeParse(req.body);
    if (!parseBodyResult.success) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const { name, capacity, lon, lat } = req.body;

    const updatedStation = await stationService.update(stationId, {
      name,
      capacity,
      lon,
      lat,
    });

    res.json(updatedStation);
  } catch {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
