import { stationRepository } from '../repositories/StationRepository.js';
import UpdateStationDto from '../types/UpdateStationDto.js';
import Station from '../types/Station.js';

export const stationService = {
  async update(
    stationId: string,
    updateStationDto: UpdateStationDto
  ): Promise<Station> {
    return stationRepository.update(stationId, updateStationDto);
  },
  async findById(stationId: string): Promise<Station | null> {
    return stationRepository.findById(stationId);
  },
};
