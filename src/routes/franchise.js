const express = require('express');
const router = express.Router();
const FranchiseRequest = require('../models/FranchiseRequest');

/**
 * POST /api/franchise
 * Recibir solicitudes de franquicia/host de estación
 */
router.post('/', async (req, res) => {
  try {
    const { 
      name, 
      email, 
      phone, 
      businessName, 
      location, 
      type,
      message 
    } = req.body;

    // Validación básica
    if (!name || !email || !businessName) {
      return res.status(400).json({
        error: 'Nombre, email y nombre del negocio son requeridos'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Email inválido'
      });
    }

    // Guardar en BD
    const newRequest = await FranchiseRequest.create(
      name,
      email,
      phone,
      businessName,
      location,
      type || 'franchise',
      message
    );

    console.log(`🏢 Nueva solicitud de franquicia/host de ${name}`);

    res.status(201).json({
      success: true,
      message: '¡Solicitud recibida! Nos pondremos en contacto en breve.',
      data: newRequest
    });

  } catch (error) {
    console.error('Error en solicitud de franquicia:', error);
    res.status(500).json({
      error: 'Error al procesar la solicitud'
    });
  }
});

/**
 * GET /api/franchise
 * Listar todas las solicitudes (solo admin después)
 */
router.get('/', async (req, res) => {
  try {
    const requests = await FranchiseRequest.findAll();
    res.json({
      total: requests.length,
      requests: requests
    });
  } catch (error) {
    console.error('Error obteniendo solicitudes de franquicia:', error);
    res.status(500).json({ error: 'Error al obtener solicitudes' });
  }
});

/**
 * GET /api/franchise/:id
 * Obtener detalle de solicitud específica
 */
router.get('/:id', async (req, res) => {
  try {
    const request = await FranchiseRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        error: 'Solicitud no encontrada'
      });
    }

    res.json({
      success: true,
      data: request
    });
  } catch (error) {
    console.error('Error obteniendo solicitud:', error);
    res.status(500).json({ error: 'Error al obtener solicitud' });
  }
});

/**
 * PUT /api/franchise/:id/status
 * Actualizar estado de solicitud (admin)
 */
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    if (!['new', 'reviewed', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        error: 'Status inválido'
      });
    }

    const updatedRequest = await FranchiseRequest.updateStatus(req.params.id, status);

    if (!updatedRequest) {
      return res.status(404).json({
        error: 'Solicitud no encontrada'
      });
    }

    res.json({
      success: true,
      message: `Status actualizado a: ${status}`,
      data: updatedRequest
    });
  } catch (error) {
    console.error('Error actualizando solicitud:', error);
    res.status(500).json({ error: 'Error al actualizar solicitud' });
  }
});

module.exports = router;
