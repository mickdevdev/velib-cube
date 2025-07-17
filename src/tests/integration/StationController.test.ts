import express from 'express';
import request from 'supertest';
import stationRoutes from '../../routes/stations.js';
import { db } from '../../db/db.js';

describe('StationController', () => {
  const app = express();
  app.use(express.json());
  app.use('/api', stationRoutes);

  beforeEach(async () => {
    await db.query('TRUNCATE TABLE stations');
    await db.query(`
          INSERT INTO stations (id, name, capacity, lon, lat) VALUES 
          (3, 'Test Versailles', 20, 2.3522, 48.8574),
          (10, 'Test Vanves', 15, 4.7044, 32.8510)
        `);
  });

  afterAll(async () => {
    await db.query('TRUNCATE TABLE stations');
    await db.end();
  });

  describe('PUT /stations/:id', () => {
    it('should update a station', async () => {
      const stationId = 3;
      const updateStationDto = {
        name: 'Bastille',
        capacity: 32,
        lon: 2.294694,
        lat: 40,
      };

      const response = await request(app)
        .put(`/api/stations/${stationId}`)
        .send(updateStationDto);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: '3',
        ...updateStationDto,
      });
    });

    it('should return 404 for non-existent station', async () => {
      const stationId = '999';
      const updateStationDto = {
        name: 'Republique',
        capacity: 32,
        lon: 2.294694,
        lat: 40.45645,
      };

      const response = await request(app)
        .put(`/api/stations/${stationId}`)
        .send(updateStationDto);

      expect(response.status).toBe(404);
      expect(response.text).toBe(`Station ${stationId} not found`);
    });

    it('should return 400 when name is empty', async () => {
      const stationId = '3';
      const updateStationDto = {
        name: '',
        capacity: 15,
        lon: 80,
        lat: 20,
      };

      const response = await request(app)
        .put(`/api/stations/${stationId}`)
        .send(updateStationDto);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Invalid request body' });
    });

    it('should return 400 when capacity is negative', async () => {
      const stationId = '3';
      const updateStationDto = {
        name: 'Italie',
        capacity: -10,
        lon: 2.294694,
        lat: 40.45645,
      };

      const response = await request(app)
        .put(`/api/stations/${stationId}`)
        .send(updateStationDto);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Invalid request body' });
    });

    it('should return 400 when longitude is invalid', async () => {
      const stationId = '3';
      const updateStationDto = {
        name: 'Italie',
        capacity: 10,
        lon: 185,
        lat: 40.45645,
      };

      const response = await request(app)
        .put(`/api/stations/${stationId}`)
        .send(updateStationDto);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Invalid request body' });
    });

    it('should return 400 when latitude is invalid', async () => {
      const stationId = '3';
      const updateStationDto = {
        name: 'Italie',
        capacity: 10,
        lon: 80,
        lat: 105,
      };

      const response = await request(app)
        .put(`/api/stations/${stationId}`)
        .send(updateStationDto);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Invalid request body' });
    });
  });
});
