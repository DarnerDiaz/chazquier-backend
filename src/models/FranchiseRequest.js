const pool = require('../config/database');

class FranchiseRequest {
  static async create(name, email, phone, businessName, location, type = 'franchise', message) {
    const result = await pool.query(
      `INSERT INTO franchise_requests (name, email, phone, business_name, location, type, message) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, email, phone, businessName, location, type, message]
    );
    return result.rows[0];
  }

  static async findAll() {
    const result = await pool.query(
      `SELECT id, name, email, phone, business_name as "businessName", location, type, message, status, created_at as "createdAt", updated_at as "updatedAt" 
       FROM franchise_requests ORDER BY created_at DESC`
    );
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query(
      `SELECT id, name, email, phone, business_name as "businessName", location, type, message, status, created_at as "createdAt" 
       FROM franchise_requests WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  }

  static async updateStatus(id, status) {
    const validStatuses = ['new', 'reviewed', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      throw new Error('Status inválido');
    }

    const result = await pool.query(
      `UPDATE franchise_requests SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
      [status, id]
    );
    return result.rows[0];
  }
}

module.exports = FranchiseRequest;
