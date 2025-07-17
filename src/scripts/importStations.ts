import { db } from '../db/db.js';
import format from 'pg-format';

interface Station {
  station_id: string;
  name: string;
  capacity: number;
  lon: number;
  lat: number;
}

(async () => {
  await db.query('TRUNCATE TABLE stations');

  const response = await fetch(
    'https://velib-metropole-opendata.smovengo.cloud/opendata/Velib_Metropole/station_information.json'
  );

  const json = await response.json();
  const stations: Station[] = json.data.stations;

  try {
    const values = stations.map((station) => [
      station.station_id,
      station.name,
      station.capacity,
      station.lon,
      station.lat,
    ]);

    const query = format(
      'INSERT INTO stations (id, name, capacity, lon, lat) VALUES %L',
      values
    );

    await db.query(query);

    console.log(`${stations.length} Stations imported`);

    await db.end();
  } catch (error) {
    console.error('Error ', error);
  }
})();
