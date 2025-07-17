import UpdateStationDto from './../types/UpdateStationDto.js';
import Station from './../types/Station.js';
import { db } from './../db/db.js';

export interface StationRepository {
  update(
    stationId: string,
    updateStationDto: UpdateStationDto
  ): Promise<Station>;
  findById(stationId: string): Promise<Station | null>;
}

export const stationRepository: StationRepository = {
  async update(stationId, updateStationDto): Promise<Station> {
    const updatedStation = await db.query(
      'UPDATE stations SET name = $1, capacity = $2, lon = $3, lat = $4 WHERE id = $5 RETURNING *',
      [
        updateStationDto.name,
        updateStationDto.capacity,
        updateStationDto.lon,
        updateStationDto.lat,
        parseInt(stationId),
      ]
    );

    return updatedStation.rows[0];
  },
  async findById(stationId): Promise<Station | null> {
    const result = await db.query('SELECT * FROM stations WHERE id = $1', [
      stationId,
    ]);
    const row = result.rows[0];
    if (!row) return null;

    const station: Station = {
      id: row.id,
      name: row.name,
      capacity: row.capacity,
      lon: row.lon,
      lat: row.lat,
    };

    return station;
  },
};
