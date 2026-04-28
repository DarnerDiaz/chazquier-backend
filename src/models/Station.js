const pool = require('../config/database');

class Station {
  static async create(name, latitude, longitude, address, totalUnits = 10, deviceTypes = ['Smartphones']) {
    const result = await pool.query(
      `INSERT INTO stations (name, latitude, longitude, address, available_units, total_units, device_types) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, latitude, longitude, address, totalUnits, totalUnits, deviceTypes]
    );
    return result.rows[0];
  }

  static async findAll() {
    const result = await pool.query(
      'SELECT id, name, latitude, longitude, address, available_units as "availableUnits", total_units as "totalUnits", device_types as "deviceTypes", status FROM stations ORDER BY created_at DESC'
    );
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query(
      'SELECT id, name, latitude, longitude, address, available_units as "availableUnits", total_units as "totalUnits", device_types as "deviceTypes", status FROM stations WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  static async findNearby(latitude, longitude, radiusKm = 5) {
    // Usar fórmula de Haversine para calcular distancia
    const result = await pool.query(
      `SELECT id, name, latitude, longitude, address, available_units as "availableUnits", total_units as "totalUnits", device_types as "deviceTypes", status,
       (6371 * acos(cos(radians($1)) * cos(radians(latitude)) * cos(radians(longitude) - radians($2)) + sin(radians($1)) * sin(radians(latitude)))) AS distance
       FROM stations
       WHERE (6371 * acos(cos(radians($1)) * cos(radians(latitude)) * cos(radians(longitude) - radians($2)) + sin(radians($1)) * sin(radians(latitude)))) <= $3
       ORDER BY distance ASC`,
      [latitude, longitude, radiusKm]
    );
    return result.rows;
  }

  static async update(id, updates) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    for (const [key, value] of Object.entries(updates)) {
      fields.push(`${key} = $${paramCount}`);
      values.push(value);
      paramCount++;
    }

    values.push(id);

    const result = await pool.query(
      `UPDATE stations SET ${fields.join(', ')}, updated_at = NOW() WHERE id = $${paramCount} RETURNING *`,
      values
    );
    return result.rows[0];
  }
}

module.exports = Station;
