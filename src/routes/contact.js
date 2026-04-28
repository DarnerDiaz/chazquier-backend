const express = require('express');
const router = express.Router();
const ContactForm = require('../models/ContactForm');

/**
 * POST /api/contact
 * Recibir mensajes de contacto del formulario
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validación básica
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Nombre, email y mensaje son requeridos' 
      });
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Email inválido' 
      });
    }

    // Guardar en BD
    const newMessage = await ContactForm.create(name, email, message);

    console.log(`📧 Nuevo mensaje de contacto de ${name} (${email})`);

    res.status(201).json({
      success: true,
      message: '¡Mensaje recibido! Nos contactaremos pronto.',
      data: newMessage
    });

  } catch (error) {
    console.error('Error en contacto:', error);
    res.status(500).json({ 
      error: 'Error al procesar el mensaje de contacto' 
    });
  }
});

/**
 * GET /api/contact (solo admin después)
 * Listar todos los mensajes de contacto
 */
router.get('/', async (req, res) => {
  try {
    const messages = await ContactForm.findAll();
    res.json({
      total: messages.length,
      messages: messages
    });
  } catch (error) {
    console.error('Error obteniendo contactos:', error);
    res.status(500).json({ error: 'Error al obtener mensajes' });
  }
});

module.exports = router;
