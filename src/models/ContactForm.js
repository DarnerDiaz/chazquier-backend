const pool = require('../config/database');

class ContactForm {
  static async create(name, email, message) {
    const result = await pool.query(
      'INSERT INTO contact_forms (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      [name, email, message]
    );
    return result.rows[0];
  }

  static async findAll() {
    const result = await pool.query(
      'SELECT * FROM contact_forms ORDER BY created_at DESC'
    );
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query(
      'SELECT * FROM contact_forms WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  static async updateStatus(id, status) {
    const result = await pool.query(
      'UPDATE contact_forms SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    return result.rows[0];
  }
}

module.exports = ContactForm;
